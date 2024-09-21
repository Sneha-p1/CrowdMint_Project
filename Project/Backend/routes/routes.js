const express = require ('express')
const router = express.Router()
const app = express();
const Project = require('../model/project')
const User = require('../model/user')
const verifyToken = require ('../middleware/authmw')
const path = require('path');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projectDetails = await Project.find({});
    res.json(projectDetails);
  } catch (error) {
    res.status(500).send('Error fetching projects');
  }
});

router.get('/api/projects', async (req, res) => {
  try {
      const { search } = req.query;
      let projects;

      if (search) {
          const regex = new RegExp(search, 'i'); // 'i' makes it case insensitive
          projects = await Project.find({ title: regex });
      } else {
          projects = await Project.find({});
      }

      res.json(projects);
  } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/new-project', verifyToken, async (req, res) => {
  const { title, tagline, description, targetAmount } = req.body;

  try {
    const user = await User.findById(req.user.userId); // Use userId set by middleware
    if (!user) return res.sendStatus(404);

    const newProject = new Project({
      title,
      tagline,
      description,
      targetAmount,
      createdBy: user.name // Use name from token
    });

    await newProject.save();
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

//working get fucntion NEVER DELETE
// router.get('/dashboard', verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId); // Use userId set by middleware
//     if (!user) return res.sendStatus(404);
//     res.json({ name: user.name, email: user.email }); // Send name and email
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: "Failed to fetch user details" });
//   }
// });

router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Use userId set by middleware
    if (!user) return res.sendStatus(404);

    const projects = await Project.find({ createdBy: user.name });

    const totalPledged = projects.reduce((sum, project) => sum + project.pledgedAmount, 0);   //newly added to get total amount

    res.json({ name: user.name, email: user.email, projects, totalPledged });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.json(project);
  } catch (error) {
    res.status(500).send('Error fetching project details');
  }
});

// Post a donation to a project
router.post('/donate', verifyToken, async (req, res) => {
  const { title, amount } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.sendStatus(404);

    const project = await Project.findOne({ title });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    project.pledgedAmount += parseFloat(amount);
    await project.save();

    //currently working code NEVER DELETE
  //   res.status(201).json({ message: "Donation successful", project });
  // } catch (error) {
  //   console.error('Error:', error);
  //   res.status(400).json({ error: 'Error saving donation' });
  // }
  res.status(201).json({ message: "Donation successful", project: { title: project.title, amount: parseFloat(amount) } });
} catch (error) {
  console.error('Error:', error);
  res.status(400).json({ error: 'Error saving donation' });
}

});

router.put('/projects/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, tagline, targetAmount, pledgedAmount } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title, tagline, targetAmount, pledgedAmount },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});




module.exports = router;
