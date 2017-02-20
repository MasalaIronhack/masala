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
    res.redirect("/account?access_token=" +"EAAMSMZCF0V70BANvQAr5UUB0Riv2GoamRMIQUNwAn9LM0on4ZANA7lZC7R2Q6uxzgLjjXZCY1O7ORK1sCLV74W4EbHmHovz5EiSnuZAZAtVsRJXKphyZBqNO74PN5OB1K9eiYfHWaGMoMVjJpBdA8WUHVxAZCMddURmd7odparZARw8vHE36WZAxlr");
    // req.user.access_token);
  }
);









module.exports = router;
