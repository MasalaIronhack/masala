require('dotenv').config();

const bodyParser = require('body-parser');
const Friend = require('../models/friends');
const Data = require('../models/data');
const TasteKid = require('../models/tastekid');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const meetup = require('meetup-api')({key: '406044782c42396269125310632a6519'});


/* GET users listing. */

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/account', isLoggedIn, function(req, res) {
    res.render('account', {
        user: req.user // get the user out of session and pass to template

    });

});



router.post('/account', function(req, res) {

    /// FRIENDS REQUEST

    var insertionFriends = {

        friends: req.body.userDatas.taggable_friends,
        userId: req.user.fbid,

    };

    // TASTEKID REQUEST

    var insertionTastekid = {
        books: req.body.userDatas.books,
        movies: req.body.userDatas.movies,
        games: req.body.userDatas.games,
        music: req.body.userDatas.music,
        userId: req.user.fbid,


    };
    console.log('insertion' + req.body.userDatas)

    var newFriends = new Friend(insertionFriends);

    var newTasteKid = new TasteKid(insertionTastekid);

    console.log(insertionTastekid);

    newFriends.save((err) => {
        if (err) {
            res.render('index', {
                errorMessage: 'Something went wrong. Try again later.'
            });
            return;
        }
        return;
    });

    newTasteKid.save((err) => {
        if (err) {
            res.render('index', {
                errorMessage: 'Something went wrong. Try again later.'
            });
            return;
        }
        res.redirect('/profile');
        return;
    });
});

router.get('/profile', function(req, res) {
    //var randomFriend ="lkjh";

    Friend.findOne({
        'userId': req.user.fbid
    }, (err, friends) => {
        //var randomFriend;
        if (err) {
            res.render('index');
        } else {
            var friendLists = friends.friends;
            var randomFriend = friendLists[Math.floor(Math.random() * friendLists.length)]
            res.locals.randomFriend = randomFriend;
        }

        TasteKid.findOne({
            'userId': req.user.fbid
        }, (err, interests) => {
            if (err) {
                res.render('index');
            } else {
                console.log('interests:' + interests)
                var latitude = 40.4;
                var longitude = -3.68333;
                var movieList = interests.movies;
                var randomMovie = movieList[Math.floor(Math.random() * movieList.length)];
                var bookList = interests.books;
                var randomBook = bookList[Math.floor(Math.random() * bookList.length)];
                var musicList = interests.music;
                var randomMusic = musicList[Math.floor(Math.random() * musicList.length)];
                var maxiArray = bookList.concat(movieList);
                var maxiRandom = maxiArray[Math.floor(Math.random() * maxiArray.length)];
                console.log('maxirandom'+maxiRandom);

                var context = {
                    friend: randomFriend,
                    book: randomBook,
                    movie: randomMovie,
                    music: randomMusic,
                    latitude: latitude,
                    longitude: longitude,
                }

            function getMeetUpEvents(random,latitude,longitude) {
              var event = {};
                   meetup.getOpenEvents({
                           'text': random,
                           'lon': -3.68333,
                           'lat': 40.4,
                           'page': '1'
                       },
                       function(err, events) {

                         if(err){
                            console.log("meetup error : ",err);
                            context.eventName = "Los secretos de los cuentos de Disney";
                            context.eventUrl  = "https://www.meetup.com/fr-FR/bibliotecaalejandrina/events/237914461/?eventId=237914461";
                         }
                         else {
                               if(events.results.length>0){
                                context.eventName = events.results[0].name;
                               console.log(context.eventName);
                                context.eventUrl = events.results[0].event_url;
                               console.log(context.eventUrl);}
                               else {
                                  console.log("meetup error : ",err);
                                  context.eventName = "Los secretos de los cuentos de Disney";
                                  context.eventUrl  = "https://www.meetup.com/fr-FR/bibliotecaalejandrina/events/237914461/?eventId=237914461";
                               }
                         }
                         res.render('profile', context);
                       });
                }
                getMeetUpEvents( randomMovie , latitude , longitude);
            }
        });
        //console.log('locals :'+res.locals.books);


        //console.log(randomFriend);
    });

});

router.get('/settings', function(req, res) {
    res.render('settings');

});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');

});

/////////////////////////////////////

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}

// /////////MeetUp//////////
// // With text and latitude/longitude parameters
//
// function getMeetUpEvents() {
//     meetup.getOpenEvents({
//             'text': 'javascript',
//             'lon': '-73.979431',
//             'lat': '40.752125',
//             'page': '1'
//         },
//         function(err, events) {
//             var eventName = events.results[0].name;
//             console.log(eventName);
//             var eventUrl = events.results[0].event_url;
//             console.log(eventUrl);
//         });
// }
//
//   getMeetUpEvents();
//
//
// ////////////////////////

module.exports = router;
