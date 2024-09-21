const express = require('express');
const router = express.Router();
const UserDetails = require('../model/user');
const Project = require('../model/project');
const verifyAdmin = require('../middleware/adminmw');

// Get total number of users
router.get('/totalusers',verifyAdmin, async (req, res) => {
  try {
    const userCount = await UserDetails.countDocuments();
    console.log(userCount);
    res.json({ userCount });
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Failed to fetch total users' });
  }
});

//To Sort all Projects by Users
router.get('/allusers',verifyAdmin, async (req, res) => {
  try {
    const projectsByUser = await Project.aggregate([
      {
        $group: {
          _id: '$createdBy',
          projects: {
            $push: {
              title: '$title',
              tagline: '$tagline',
              description: '$description',
              targetAmount: '$targetAmount',
              pledgedAmount: '$pledgedAmount',
            }
          }
        }
      }
    ]);

    res.json({ projectsByUser });
  } catch (error) {
    console.error('Error fetching projects by user:', error);
    res.status(500).json({ error: 'Failed to fetch projects by user' });
  }
});

router.get('/user/:userId/projects',verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ createdBy: userId });
    res.json({ projects });
  } catch (error) {
    console.error('Error fetching projects for user:', error);
    res.status(500).json({ error: 'Failed to fetch projects for user' });
  }
});

router.delete('/projects/:projectId', verifyAdmin, async (req, res) => {
  try {
    const { projectId } = req.params;
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
