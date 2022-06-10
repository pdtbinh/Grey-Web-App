const express = require('express');
const router = express.Router();

const { User, joiUser } = require('../../models/user');
const { Project, joiProject } = require('../../models/project');
const { Post, joiPost } = require('../../models/post');
const { Comment, joiComment } = require('../../models/comment');
const Like = require('../../models/like');

const CustomError = require('../../errors/CustomError');

class ProjectHandler {
    constructor() {}

    // Validate if user inputs is valid according to Joi
    validate(req, res, next) {
        const { error } = joiProject.validate(req.body);
        if (error) {
            throw new CustomError(error.message, 500);
        }
        else {
            next();
        }
    }

    // Count likes and comments
    async countAttentions(projectid, schema) {
        const documents = await schema.find({place: 'Project', placeID: projectid});
        return documents.length;
    }

    // Assign nofLikes and nofComments to specific project
    async assignAttention(project) {
        project.nofLikes = await this.countAttentions(project._id, Like);
        project.nofComments = await this.countAttentions(project._id, Comment);
        return project;
    }

    // Assign nofLikes and nofComments to a list of projects
    async assignAttentions(projects) {
        const assignedProjects = [];
        for (const project of projects) {
            const assignedProject = await this.assignAttention(project);
            assignedProjects.push(assignedProject);
        }
        return assignedProjects;
    }

    // Verify like: check if this user already like a project
    async alreadyLiked(userid, projectid) {
        const like = await Like.findOne({userID: userid, place: 'Project', placeID: projectid});
        return like;
    }
}

module.exports = new ProjectHandler();