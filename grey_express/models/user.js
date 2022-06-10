const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    // userID: is automatically added
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // hash (password): is automatically added
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project',
        }
    ],
    educations: [
        {
            type: Object,
            //ref: 'Project',
        }
    ],
    experiences: [
        {
            type: Object,
            //ref: 'Project',
        }
    ],
    achievements: [
        {
            type: Object,
            //ref: 'Project',
        }
    ],
    certificates: [
        {
            type: Object,
            //ref: 'Project',
        }
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
})

userSchema.plugin(passportLocalMongoose);

const joiUserSchema = joi.object({
    user: joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required(),
    }).required()
})

module.exports = { User: mongoose.model('User', userSchema), joiUser: joiUserSchema }