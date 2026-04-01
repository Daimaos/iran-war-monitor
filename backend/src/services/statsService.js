const axios = require('axios');
const Event = require('../models/Event');

async function getStats() {
    try {
        // Days since conflict started
        const startDate = new Date('2026-02-28');
        const days = Math.floor((new Date() - startDate) / 86400000);

        // Total fatalities from MongoDB
        const fatalityResult = await Event.aggregate([
            { $group: { _id: null, total: { $sum: '$fatalities' } } }
        ]);
        const casualties = fatalityResult[0]?.total || 0;

        // Instability scores per country
        const countries = ['Iran', 'Israel', 'Lebanon', 'Iraq', 'Yemen'];
        const instability = {};
        for (const country of countries) {
            const events = await Event.find({ country });
            const score = Math.min(100, events.length * 2 +
                events.filter(e => e.severity === 'Critical').length * 10 +
                events.filter(e => e.severity === 'High').length * 5
            );
            instability[country] = score;
        }

        // Oil price from free API
        let oilPrice = 'N/A';
        try {
            const oilRes = await axios.get(
                'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?interval=1d&range=1d'
            );
            const price = oilRes.data?.chart?.result?.[0]?.meta?.regularMarketPrice;
            if (price) oilPrice = `$${price.toFixed(2)}/bbl`;
        } catch {
            oilPrice = 'Unavailable';
        }

        return { days, casualties, oilPrice, instability };
    } catch (err) {
        console.error('❌ Stats error:', err.message);
        return {};
    }
}

module.exports = { getStats };