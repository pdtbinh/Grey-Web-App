const express = require('express');
const router = express.Router();
const SurveyHandler = require('./SurveyHandler');

// Surf all surveys (custom sort + recommendation system)
router.get('/', async (req, res, next) => {

})

// Like survey
router.post('/:surveyid/like', async (req, res, next) => {
    
})

// Comment on survey
router.post('/:surveyid/comment', async (req, res, next) => {
    
})

module.exports = router