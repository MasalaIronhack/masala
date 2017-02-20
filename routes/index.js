var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res){
  res.render('index');
});

router.get(
    '/account',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
    res.send("LOGGED IN as " + req.user.facebookId + "Name:"+req.user.name +" - <a href=\"/logout\">Log out</a>");
    //res.render('profile');
    }
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
