const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const postSchema = new Schema({
    // projectID: is automatically added
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

const joiPostSchema = joi.object({
    post: joi.object({
        description: joi.string().required(),
    }).required()
})

module.exports = { Post: mongoose.model('Post', postSchema), joiPost: joiPostSchema};