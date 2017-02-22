require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */

router.get(
  '/auth/facebook',
    passport.authenticate('facebook', { session: false,
      scope: ['user_friends', 'user_likes'] ,
      })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
  function(req, res) {
    res.redirect("/account?access_token=" +process.env.FB_TOKEN);
    // req.user.access_token);
  }
);









module.exports = router;
