require('dotenv').config();
var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
        res.render('index.ejs');
    });



// route for facebook authentication and login
 router.get('/auth/facebook', passport.authenticate('facebook', { scope : [] }));

 // handle the callback after facebook has authenticated the user
 router.get('/auth/facebook/callback',
     passport.authenticate('facebook', {
         successRedirect : '/account',
         failureRedirect : '/'
     }));



 // route middleware to make sure a user is logged in
 function isLoggedIn(req, res, next) {

     // if user is authenticated in the session, carry on
     if (req.isAuthenticated())
         return next();

     // if they aren't redirect them to the home page
     res.redirect('/');
 }







module.exports = router;
