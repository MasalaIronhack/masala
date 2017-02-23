const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MeetUpEventSchema = new mongoose.Schema({
    text: String,
    lon:  Number,
    lat:  Number,
});

var MeetUpEvent = mongoose.model('MeetUpEvent', MeetUpEventSchema);
module.exports = MeetUpEvent;
