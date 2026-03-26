const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Get top headlines
router.get('/headlines', newsController.getHeadlines);

// Get news by category
router.get('/category/:category', newsController.getNewsByCategory);

// Search news
router.get('/search', newsController.searchNews);

module.exports = router;
