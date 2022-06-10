const express = require('express');
const router = express.Router();
const PostHandler = require('./PostHandler');

// Surf all posts (custom sort + recommendation system)
router.get('/', async (req, res, next) => {
    
})

// Like post
router.post('/:postid/like', async (req, res, next) => {
    
})

// Comment on post
router.post('/:postid/comment', async (req, res, next) => {
    
})

module.exports = router