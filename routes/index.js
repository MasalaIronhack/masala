require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Data     = require('../models/data');

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

router.get('/account', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user // get the user out of session and pass to template
      });
  });

router.post('/account', function(req, res){
var query = {'fbid':req.user.fbid};

var insertion = {
  datas : req.body.userDatas
}
User.findOneAndUpdate(query, { $set: insertion }, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
});

  console.log(req.user.fbid);
  console.log(req.body.userDatas);
    return res.sendStatus(200);
});

router.get('/logout', function(req, res){
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
