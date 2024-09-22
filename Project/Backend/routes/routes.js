const express = require ('express')
const router = express.Router()
const app = express();
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
