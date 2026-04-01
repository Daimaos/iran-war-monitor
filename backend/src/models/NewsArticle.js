const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: String,
    summary: String,
    source: String,
    url: String,
    category: String,
    publishedAt: Date,
    fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NewsArticle', NewsSchema);