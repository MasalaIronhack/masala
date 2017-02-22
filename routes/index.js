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
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    });
});

// var query = {'fbid':req.user.fbid};

// var insertion = {
//   datas : req.body.userDatas
// };

// User.findOneAndUpdate(query, { $set: insertion }, {upsert:true}, function(err, doc){
//     if (err) return res.send(500, { error: err });
//     return res.send("succesfully saved");
// });

// console.log(req.user.fbid);

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
        user: req.user
    };


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
        res.redirect('/');
        return;
    });


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
