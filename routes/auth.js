var express = require('express');
var router = express.Router();
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
    res.redirect("/account?access_token=" + req.user.access_token);
  }
);









module.exports = router;
