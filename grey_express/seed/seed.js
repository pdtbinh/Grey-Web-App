// Connecting to database
const mongoose = require('mongoose');

async function mongooseConnect() {
    await mongoose.connect('mongodb://localhost:27017/grey_1');
    console.log('Database connected...');
}

// Models
const { User, joiUser } = require('../models/user');
const { Project, joiProject } = require('../models/project');
const { Comment, joiComment } = require('../models/comment');

// Reset database
async function clearDB() {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Comment.deleteMany({});
}

// Seed different models
const firstNames = ['Anh', 'Giang', 'Khue'];
const lastNames = ['Le', 'Nguyen', 'Nguyen'];
const emails = ['anh@gmail.com', 'giang@gmail.com', 'khue@gmail.com'];
const usernames = ['al', 'gn', 'kn'];
const password = 'tb';

async function seedUser(nofObjects) {
    const users = [];
    [...Array(nofObjects).keys()].forEach(e => {
        const user = new User({
            firstName: firstNames[e],
            lastName: lastNames[e],
            email: emails[e],
            username: usernames[e],
        })
        users.push(user);
    })
    for (const user of users) {
        const newUser = await User.register(user, password);
        console.log(newUser);
    }
}

// async function seedProject(nofObjects, userID) {
//     const user = await User.findById(userID);
//     const projects = [];
//     [...Array(nofObjects).keys()].forEach(e => {
//         const project = new Project({
//             name: `Project ${e}`,
//             ownerID: userID,
//             description: `Describe project ${e.toString()} of user ${user.name}.`,
//             nofLikes: 0,
//             nofComments: 0,
//             })
//         projects.push(project);
//     })
//     user.projects = [...projects];
//     await user.save();
//     await Project.insertMany(projects).then(res => console.log(`Here are projects: ${res}`)).catch(err => console.log(err));
// }

// async function seedComment(nofObjects, projectID) {
//     const allUsers = await User.find({});
//     const project = await Project.findById(projectID);
//     const comments = [];
//     [...Array(nofObjects).keys()].forEach(e => {
//         const user = allUsers[Math.floor(Math.random() * allUsers.length)];
//         const comment = new Comment({
//             projectID: projectID,
//             ownerID: user._id,
//             content: `Wow, ${user.name} created a nice ${project.name}!`,
//             nofLikes: 0,
//             nofReplies: 0,
//             })
//         comments.push(comment);
//     })
//     project.nofLikes += nofObjects;
//     project.nofComments += nofObjects;
//     await project.save()
//     await Comment.insertMany(comments).then(res => console.log(`Here are comments: ${res}`)).catch(err => console.log(err));
// }

// async function seedReply(nofObjects, commentID) {
//     const allUsers = await User.find({});
//     const comment = await Comment.findById(commentID);
//     const user = await User.findById(comment.ownerID);
//     const replies = [];
//     [...Array(nofObjects).keys()].forEach(e => {
//         const user = allUsers[Math.floor(Math.random() * allUsers.length)];
//         const reply = new Reply({
//             commentID: commentID,
//             ownerID: user._id,
//             content: `Useful comment from ${user.name}.`,
//             nofLikes: 0,
//             })
//         replies.push(reply);
//     })
//     comment.nofLikes += nofObjects;
//     await comment.save()
//     await Reply.insertMany(replies).then(res => console.log(`Here are replies: ${res}`)).catch(err => console.log(err));
// }

// Seeding
const getRandom = () => Math.floor(Math.random() * 9) + 1;

async function seed() {
    // Connect
    await mongooseConnect().catch(err => console.log(err));

    // Clear
    await clearDB();

    // 1. Seed users
    await seedUser(3);

    // 2. Seed projects to each user
    // const users = await User.find({});
    // for (const user of users) {
    //     const res = await seedProject(getRandom(), user._id);
    // }
    
    // // 3. Seed comments to each project
    // const projects = await Project.find({});
    // for (const project of projects) {
    //     await seedComment(getRandom(), project._id);
    // }
        
    // // 4. Seed replies to each comment
    // const comments = await Comment.find({});
    // for (const comment of comments) {
    //     await seedReply(getRandom(), comment._id);
    // }
}

// MAIN
seed();