const express = require('express');
const router = express.Router();

const ProjectHandler = require('./ProjectHandler');
const LogHandler = require('../log/LogHandler');

const { User, joiUser } = require('../../models/user');
const { Project, joiProject } = require('../../models/project');
const { Post, joiPost } = require('../../models/post');
const { Comment, joiComment } = require('../../models/comment');
const Like = require('../../models/like');

const { storage } = require('../../cloudinary');
const multer = require('multer');
const upload = multer({ storage });



// Surf all projects (custom sort + recommendation system)
router.get('/', LogHandler.isLoggedIn, async (req, res, next) => {
    const projects = await Project.find({}).populate('userID');
    const assignedProjects = await ProjectHandler.assignAttentions(projects);
    res.json({
        projects: assignedProjects,
    })
    //res.render('projects', { assignedProjects });
})

// Get add project form
router.get('/add', LogHandler.isLoggedIn, async (req, res, next) => {
    res.render('addproject');
})

// Add project 
router.post('/add', LogHandler.isLoggedIn, ProjectHandler.validate, async (req, res, next) => {
    // Create and save project
    const { name, description } = req.body.project;
    const user = req.user;
    const project = new Project({
        name: name,
        userID: user._id,
        description: description,
    })
    await project.save();
    const projectID = project._id;

    // Add project to user
    user.projects.push(project);
    await user.save();

    // Close portal
    res.redirect(`/projects/${projectID}`);
})

// View specific project
router.get('/:projectid', LogHandler.isLoggedIn, async (req, res, next) => {
    const { projectid } = req.params;
    const project = await Project.findById(projectid).populate('userID');
    const assignedProject = await ProjectHandler.assignAttention(project);
    res.render('project', { assignedProject });
})

// Like project
router.post('/:projectid/like', LogHandler.isLoggedIn, async (req, res, next) => {
    const user = req.user;
    const { projectid } = req.params;
    // If user already likes the project, remove the like
    const alreadyLiked = await ProjectHandler.alreadyLiked(user._id, projectid);
    if (alreadyLiked) {
        await Like.deleteOne(alreadyLiked);
    }
    else {
        const like = new Like({
            userID: user._id,
            place: 'Project',
            placeID: projectid,
        })
        await like.save()
    }
    res.redirect(`/projects/${projectid}`);
})

// Comment on project
router.post('/:projectid/comment', LogHandler.isLoggedIn, async (req, res, next) => {
    const user = req.user;
    const { projectid } = req.params;
})

module.exports = router