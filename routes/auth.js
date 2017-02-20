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
    res.redirect("/account?access_token=" +"EAAMSMZCF0V70BACEZARvzPsgudbyC6SbDSAEJesRnJtOzni4fBw4ZBLH8plJOrIF6f7TEY7ZBblNPqC72W3UrVLUKE0BtkwTQZC67b6rPmNZBAZAvs0yzZBU6oh1idB8eoYwB2RhgIOokuNNeuOWoXh5FeaiEiEW6YkjrlivMB0ByvFt3IZAlZCO1G");
    // req.user.access_token);
  }
);









module.exports = router;
