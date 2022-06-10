const express = require('express');
const router = express.Router();
const UserHandler = require('./UserHandler');

const { User, joiUser } = require('../../models/user');
const { Project, joiProject } = require('../../models/project');
const { Post, joiPost } = require('../../models/post');
const { Comment, joiComment } = require('../../models/comment');
const { Like } = require('../../models/comment');

// Surf all users (custom sort + recommendation system)
router.get('/', async (req, res, next) => {
    const users = await User.find({});
    res.render('users', { users });
})

// View specific user (first page being showed is achievements)
router.get('/:userid/achievements', async (req, res, next) => {
    const { userid } = req.params;
    console.log(userid);
    const user = await User.findById(userid).populate('projects');
    res.render('user', { user });
})

module.exports = router