const express = require('express');
const router = express.Router();
const { getStats } = require('../services/statsService');

router.get('/', async (req, res) => {
    try {
        const stats = await getStats();
        res.json({ success: true, data: stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;