const express = require('express');
const router = express.Router();
const LogHandler = require('./LogHandler');

const { User, joiUser } = require('../../models/user');
const { Project, joiProject } = require('../../models/project');
const { Post, joiPost } = require('../../models/post');
const { Comment, joiComment } = require('../../models/comment');
const { Like } = require('../../models/comment');

const passport = require('passport');

router.get('/login', LogHandler.isLoggedOut, (req, res) => {
    res.render('login');
})

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/projects');
})

router.post('/logout', LogHandler.isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/login');
})

module.exports = router;

