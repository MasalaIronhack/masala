require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


/* GET users listing. */
router.get('/', function(req, res){
  res.render('index');
});

router.get(
    '/account',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
    //res.send("LOGGED IN as " + req.user.facebookId + "Name:"+req.user.name +" - <a href=\"/logout\">Log out</a>");
    res.render('profile');
    }
);

router.post('/account', function(req, res){
console.log('body');
  console.log(req.body);
    //var data = req.params.hola;
    return res.sendStatus(200);
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
