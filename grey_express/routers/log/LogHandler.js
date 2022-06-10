const { User, joiUser } = require('../../models/user');
const { Project, joiProject } = require('../../models/project');
const { Post, joiPost } = require('../../models/post');
const { Comment, joiComment } = require('../../models/comment');
const { Like } = require('../../models/comment');

const CustomError = require('../../errors/CustomError');

class LogHandler {
    constructor() {}

    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/login');
        }
        else {
            next();
        }
    }

    isLoggedOut(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/projects');
        }
        else {
            next();
        }
    }
}

module.exports = new LogHandler();