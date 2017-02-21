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
    //var data = req.params.datas;
      console.log('lol');
    //console.log(data);
});



router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// $('.btn').click(function() {
//
// $('.text').text('loading . . .');
//
// $.ajax({
//     type:"GET", // GET = requesting data
//     url: "https://api.meetup.com/find/venues",
//     success: function(data) {
//       $('.text').text(JSON.stringify(data)); // Set data that comes back from the server to 'text'
//     },
//     // error: function()
//     dataType: 'jsonp',
//   });
// });

module.exports = router;
