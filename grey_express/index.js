/*
###################
# ENV variables #
###################
*/
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/*
###################
# Requirements #
###################
*/
// Express tools
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const morgan = require('morgan');

// Express routers
const logRoute = require('./routers/log/logRoute');
const projectsRoute = require('./routers/projects/projectsRoute');
const postsRoute = require('./routers/posts/postsRoute');
const surveysRoute = require('./routers/surveys/surveysRoute');
const usersRoute = require('./routers/users/usersRoute');

// Authentication & Authorization
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');

// Errors
const ErrorCatcher = require('./utilities/ErrorCatcher');
const CustomError = require('./errors/CustomError');

// Database
const { User, joiUser } = require('./models/user');
const { Project, joiProject } = require('./models/project');
const { Comment, joiComment } = require('./models/comment');

/*
###################
# Connect to DB #
###################
*/
const mongoose = require('mongoose');

mongooseConnect().catch(err => console.log(err));
async function mongooseConnect() {
    await mongoose.connect('mongodb://localhost:27017/grey_1');
    console.log('Database connected...');
}

/*
###################
# Express Setting #
###################
*/
// -> For production
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('sign'));
app.use(expressSession({resave: false, saveUninitialized: false, secret: 'sign'}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// -> For development
app.use(morgan('tiny'))

/*
###################
# Express Routes  #
###################
*/
// -> Login
app.use('/', logRoute);

// -> Projects
app.use('/projects', projectsRoute);

// -> Posts
app.use('/posts', postsRoute);

// -> Surveys
// app.use('surveys', projectsRoute);

// -> Users
app.use('/users', usersRoute);



// -> Home section
// app.get('/register', (req, res) => {
//     res.render('register');
// })

// app.post('/register', async (req, res) => {
//     const { error } = joiUser.validate(req.body);
//     if (error) {
//         res.send(error.details)
//     }
//     else {
//         const { firstName, lastName, email, username, password } = req.body.user;
//         const newUser = new User({
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             username: username,
//         })
//         await User.register(newUser, password);
//     }
//     res.redirect('/home');
// })

// app.get('/home', async (req, res) => {
//     if (req.isAuthenticated()) {
//         await Project.find({})
//         .populate('ownerID')
//         .then(projects => res.render('home', { projects }));
//     }
//     else {
//         res.redirect('/login');
//     }
// }) 

// // -> User section
// app.get('/user/:userid', async (req, res) => {
//     const { userid } = req.params;
//     await User.findById(userid)
//         .populate('projects')
//         .then(user => res.render('user', { user }));
// }) 

// // -> Project section
// app.get('/user/:userid/project/:projectid', async (req, res) => {
//     const { userid, projectid } = req.params;
//     const user = await User.findById(userid);
//     const project = await Project.findById(projectid);
//     res.render('project', { user, project });
// }) 

// // -> Testing route
// const createError = (req, res, next) => {
//     throw new CustomError('Testing error', 500);
// }
// app.get('/test', createError, (req, res) => {
//     // This should not be hit when there is 'createError'
//     console.log('Hit test route!');
//     res.send('Test route...');
// })

// /*
// ###################
// # Listening to sv #
// ###################
// */
// // -> 404 Not Found
// app.use((req, res, next) => {
//     console.log('Hit 404!')
//     res.status(404).send('404: Not found');
// })

// // -> Handles errors occur in accessing some route
// app.use((err, req, res, next) => {
//     console.log('Caught error!')
//     res.status(500).send(err);
// })

// -> Listening to port
app.listen('3001', () => {
    console.log('Running...');
})