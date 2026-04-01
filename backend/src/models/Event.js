const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    event_id: { type: String, unique: true },
    event_date: Date,
    event_type: String,
    sub_event_type: String,
    actor1: String,
    actor2: String,
    country: String,
    location: String,
    latitude: Number,
    longitude: Number,
    fatalities: Number,
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
    notes: String,
    source: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);