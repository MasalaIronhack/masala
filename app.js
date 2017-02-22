/* jshint esversion:6 */
require('dotenv').config();

const express              = require('express');
const path                 = require('path');
const favicon              = require('serve-favicon');
const logger               = require('morgan');
const cookieParser         = require('cookie-parser');
const bodyParser           = require('body-parser');
const FacebookStrategy     = require('passport-facebook').Strategy;
const LocalStrategy        = require('passport-local').Strategy;
const passport             = require('passport');
const index                = require('./routes/index');
const auth                = require('./routes/auth');
const mongoose             = require('mongoose');
const User                 = require('./models/user');
const Data                 = require('./models/data');
const session              = require("express-session");
const flash                = require('connect-flash');
const MongoStore           = require("connect-mongo")(session);
const meetup               = require('meetup-api')({
                             key: '406044782c42396269125310632a6519'});
const app = express();

mongoose.connect('mongodb://localhost/masala');


passport.serializeUser(function(user, done) {
       done(null, user.id);
   });

   // used to deserialize the user
   passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
           done(err, user);
       });
   });
////////////////////////////////////////////////:
passport.use(new FacebookStrategy({

  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
   profileFields: ['id', 'displayName'],
},

// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
    // asynchronous
    process.nextTick(function() {
        // find the user in the database based on their facebook id
        User.findOne({ 'fbid' : profile.id }, function(err, user) {
            // if there is an error, stop everything and return that
            // ie an error connecting to the database
            if (err)
                return done(err);
            // if the user is found, then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
              console.log('numero dprofile' + profile.id)
                // if there is no user found with that facebook id, create them
                var newUser          = new User();
                newUser.fbid           = profile.id;
                newUser.name          = profile.displayName;
                newUser.access_token  = process.env.FB_TOKEN;
                // save our user to the database
                newUser.save(function(err) {
                    if (err)
                        throw err;

                    // if successful, return the new user
                    return done(null, newUser);
                });
            }

        });
    });

}));

/////////////////////////////////////////////////////////::

// required for passport
app.use(session({
  secret: 'never do your own laundry again',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//////////////////////////////////////////////////:

app.use(express.static(path.join(__dirname, "bower_components")));

app.use('/', auth);

/////////MeetUp//////////
// With text and latitude/longitude parameters
function getMeetUpEvents () {
meetup.getOpenEvents({'text':'Star Wars', 'lon': '-73.979431', 'lat': '40.752125', 'page' : '1'}, function(err,events) {
//console.log(events);
});
}

getMeetUpEvents();
////////////////////////

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', index);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
//*app.use(function(req, res, next) {

app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
