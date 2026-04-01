const axios = require('axios');
const Event = require('../models/Event');

async function getACLEDToken() {
    const res = await axios.post(
        'https://acleddata.com/oauth/token',
        new URLSearchParams({
            username: process.env.ACLED_EMAIL,
            password: process.env.ACLED_PASSWORD,
            grant_type: 'password',
            client_id: 'acled'
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return res.data.access_token;
}

function getSeverity(event) {
    const fatalities = parseInt(event.fatalities) || 0;
    const type = event.event_type?.toLowerCase() || '';
    if (fatalities > 50 || type.includes('explosion') || type.includes('airstrike')) return 'Critical';
    if (fatalities > 10 || type.includes('armed clash')) return 'High';
    if (fatalities > 0 || type.includes('attack')) return 'Medium';
    return 'Low';
}

async function fetchACLEDEvents() {
    console.log('⚔️ Fetching ACLED events...');
    try {
        const token = await getACLEDToken();
        const countries = 'Iran:OR:country=Israel:OR:country=Lebanon:OR:country=Iraq:OR:country=Yemen';
        const res = await axios.get(
            `https://acleddata.com/api/acled/read?_format=json&country=${countries}&limit=200`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const events = res.data.data || [];
        for (const e of events) {
            await Event.findOneAndUpdate(
                { event_id: e.event_id_cnty },
                {
                    event_id: e.event_id_cnty,
                    event_date: new Date(e.event_date),
                    event_type: e.event_type,
                    sub_event_type: e.sub_event_type,
                    actor1: e.actor1,
                    actor2: e.actor2,
                    country: e.country,
                    location: e.location,
                    latitude: parseFloat(e.latitude),
                    longitude: parseFloat(e.longitude),
                    fatalities: parseInt(e.fatalities) || 0,
                    severity: getSeverity(e),
                    notes: e.notes,
                    source: e.source,
                },
                { upsert: true, new: true }
            );
        }
        console.log(`✅ Saved ${events.length} ACLED events`);
    } catch (err) {
        console.error('❌ ACLED fetch failed:', err.message);
    }
}

module.exports = { fetchACLEDEvents };