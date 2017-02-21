require('dotenv').config();
const bodyParser           = require('body-parser');


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

    //res.send("LOGGED IN as " + req.user.facebookId + "Name:"+req.user.name +" - <a href=\"/logout\">Log out</a>");
    res.render('profile');
    }
);

router.post('/account', function(req, res){
  console.log(req.body.userDatas);

    const datas = {
      userDatas : req.body.userDatas
    };
    User.findByIdAndUpdate("58a9d98739728640b31d83f4", datas, { new: true },(err, user) => {
      if (err)       { return res.render('index') }
    if (!campaign) { return res.render('index') }
    return res.redirect('/account');

    });

    //var data = req.params.hola;

    //var data = req.params.hola;
    return res.sendStatus(200);
});


router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
