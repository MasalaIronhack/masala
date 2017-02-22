require('dotenv').config();
const bodyParser           = require('body-parser');

const Data                 = require('../models/data');

var express = require('express');
var router = express.Router();
const passport = require('passport');
/* GET users listing. */
router.get('/', function(req, res){
  res.render('index');
});


router.get('/account', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user // get the user out of session and pass to template
      });
  });

router.post('/account', function(req, res){
var query = {'fbid':req.user.fbid};

/*User.findOneAndUpdate(query, { $set: insertion }, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");


});*/
var insertion = {
  content : req.body.userDatas,
  user : req.user
}


var newDatas = new Data(insertion);

newDatas.save((err) => {
  if (err) {
    res.render('index', {
      errorMessage: 'Something went wrong. Try again later.'
    });
    return;
  }

  res.redirect('/');
});


*/

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
