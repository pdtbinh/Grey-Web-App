const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');

const commentSchema = new Schema({
    // commentID: is automatically added
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    place: {
        type: String,
        required: true,
        enum: ['Comment', 'Project', 'Post', 'Survey'],
    },
    placeID: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'place',
    },
    content: {
        type: String,
        required: true,
    },
})

const joiCommentSchema = joi.object({
    comment: joi.object({
        place: joi.string().required(),
        placeID: joi.string().required(),
        content: joi.string().required(),
    }).required()
})

module.exports = { Comment: mongoose.model('Comment', commentSchema), joiComment: joiCommentSchema};