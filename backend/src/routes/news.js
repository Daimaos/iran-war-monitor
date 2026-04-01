const express = require('express');
const router = express.Router();
const NewsArticle = require('../models/NewsArticle');
const { fetchNews } = require('../services/newsService');

// Get cached news from MongoDB
router.get('/', async (req, res) => {
    try {
        const articles = await NewsArticle.find()
            .sort({ publishedAt: -1 })
            .limit(30);
        res.json({ success: true, data: articles });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Force refresh news
router.post('/refresh', async (req, res) => {
    try {
        await fetchNews();
        const articles = await NewsArticle.find()
            .sort({ publishedAt: -1 })
            .limit(30);
        res.json({ success: true, data: articles });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;