require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
        res.render('index.ejs');
    });

router.get(
  '/auth/facebook',
    passport.authenticate('facebook', { session: false,
      scope: ['user_friends', 'user_likes'] ,
      })
);

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
