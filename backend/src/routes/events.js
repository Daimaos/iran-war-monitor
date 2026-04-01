const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { fetchACLEDEvents } = require('../services/acledService');

// Get all events
router.get('/', async (req, res) => {
    try {
        const { severity, type, limit = 100 } = req.query;
        let query = {};
        if (severity) query.severity = severity;
        if (type) query.event_type = type;
        const events = await Event.find(query)
            .sort({ event_date: -1 })
            .limit(parseInt(limit));
        res.json({ success: true, data: events });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Force refresh from ACLED
router.post('/refresh', async (req, res) => {
    try {
        await fetchACLEDEvents();
        res.json({ success: true, message: 'Events refreshed' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;