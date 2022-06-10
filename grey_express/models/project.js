const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const projectSchema = new Schema({
    // projectID: is automatically added
    name: {
        type: String,
        required: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const joiProjectSchema = joi.object({
    project: joi.object({
        name: joi.string().required(),
        description: joi.string().required(),
    }).required()
})

module.exports = { Project: mongoose.model('Project', projectSchema), joiProject: joiProjectSchema};