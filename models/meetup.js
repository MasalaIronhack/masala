const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MeetUpEventSchema = new mongoose.Schema({
    text: String,
    lon:  Number,
    lat:  Number,
});

function getMeetUpEvents() {
    meetup.getOpenEvents({
            'text': 'Star Wars',
            'lon': '-73.979431',
            'lat': '40.752125',
            'page': '1'
        },
        function(err, events) {
            console.log(events);
        });
}

getMeetUpEvents();

var MeetUpEvent = mongoose.model('MeetUpEvent', MeetUpEventSchema);
module.exports = MeetUpEvent;
