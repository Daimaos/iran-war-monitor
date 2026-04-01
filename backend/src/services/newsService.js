const RSSParser = require('rss-parser');
const NewsArticle = require('../models/NewsArticle');

const parser = new RSSParser();

const RSS_FEEDS = [
    { url: 'http://feeds.bbci.co.uk/news/world/middle_east/rss.xml', source: 'BBC News' },
    { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera' },
    { url: 'https://feeds.reuters.com/Reuters/worldNews', source: 'Reuters' },
];

const IRAN_KEYWORDS = [
    'iran', 'tehran', 'khamenei', 'irgc', 'hormuz',
    'israel', 'middle east', 'airstrike', 'missile',
    'nuclear', 'sanctions', 'hezbollah', 'houthi'
];

function isRelevant(text) {
    const lower = text.toLowerCase();
    return IRAN_KEYWORDS.some(kw => lower.includes(kw));
}

function categorize(text) {
    const lower = text.toLowerCase();
    if (['strike', 'missile', 'attack', 'airstrike', 'drone', 'bomb', 'military'].some(w => lower.includes(w))) return 'Military';
    if (['talks', 'diplomacy', 'ceasefire', 'negotiat', 'deal', 'sanction'].some(w => lower.includes(w))) return 'Diplomacy';
    if (['civilian', 'refugee', 'humanitarian', 'aid', 'casualt', 'killed'].some(w => lower.includes(w))) return 'Humanitarian';
    if (['oil', 'market', 'economy', 'price', 'trade', 'export'].some(w => lower.includes(w))) return 'Economy';
    if (['protest', 'government', 'parliament', 'election', 'trump', 'biden'].some(w => lower.includes(w))) return 'Politics';
    return 'Regional';
}

async function fetchNews() {
    console.log('📰 Fetching news from RSS feeds...');
    const articles = [];

    for (const feed of RSS_FEEDS) {
        try {
            const parsed = await parser.parseURL(feed.url);
            for (const item of parsed.items) {
                const text = `${item.title} ${item.contentSnippet || ''}`;
                if (!isRelevant(text)) continue;
                articles.push({
                    title: item.title,
                    summary: item.contentSnippet || item.title,
                    source: feed.source,
                    url: item.link,
                    category: categorize(text),
                    publishedAt: new Date(item.pubDate || Date.now()),
                });
            }
        } catch (err) {
            console.error(`❌ Failed to fetch ${feed.source}:`, err.message);
        }
    }

    // Save to MongoDB (upsert by url)
    for (const article of articles) {
        await NewsArticle.findOneAndUpdate(
            { url: article.url },
            article,
            { upsert: true, new: true }
        );
    }

    console.log(`✅ Saved ${articles.length} relevant articles`);
}

module.exports = { fetchNews };