require('dotenv').config();

const bodyParser = require('body-parser');
const Friend = require('../models/friends');
const Data = require('../models/data');
const TasteKid = require('../models/tastekid');
var express = require('express');
var router = express.Router();
const passport = require('passport');

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

        user: req.user

    };

    // TASTEKID REQUEST

    var insertionTastekid = {
        books: req.body.userDatas.books,
        movies: req.body.userDatas.movies,
        games: req.body.userDatas.games,
        userId: req.user.fbid,

    };

    var newFriends = new Friend(insertionFriends);

    var newTasteKid = new TasteKid(insertionTastekid);

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
        return;
    });
    res.redirect('/profile');

});

router.get('/profile', isLoggedIn, function(req, res){

 Friend.findOne({ 'userId': req.user.id }, (err, friends) => {
   var randomFriend;
   if (err) {
     res.render('index');
 //return;
   }
    else{
   var friendLists = friends.friends;
   var randomFriend = friendLists[Math.floor(Math.random()*friendLists.length)]
   console.log(randomFriend);
   res.render('profile', {friend : randomFriend});
    }
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

module.exports = router;
