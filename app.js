/* jshint esversion:6 */
const express              = require('express');
const path                 = require('path');
const favicon              = require('serve-favicon');
const logger               = require('morgan');
const cookieParser         = require('cookie-parser');
const bodyParser           = require('body-parser');
const FacebookStrategy     = require('passport-facebook').Strategy;
const passport             = require('passport');
const index                = require('./routes/index');
const auth                = require('./routes/auth');
//const users                = require('./routes/users');
const mongoose             = require('mongoose');
const User                 = require('./models/user');

const session              = require("express-session");
const MongoStore           = require("connect-mongo")(session);
const BearerStrategy       = require('passport-http-bearer').Strategy;
const meetup               = require('meetup-api')({
                             key: '406044782c42396269125310632a6519'});
const app = express();

mongoose.connect('mongodb://localhost/masala');

passport.use(
    new FacebookStrategy(
      {
        clientID: "864439233697725",
        clientSecret: "75badc49fc339bf3c2a1f4cb3d2a9e5d",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        // profileFields: ['id', 'displayName','user_likes','user_friends'],
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOneOrCreate(
                {
                  facebookId: profile.id },
                function (err, result) {
                    if(result) {
                        console.log(profile);
                        result.name = profile.displayName;
                        result.access_token = "EAAMSMZCF0V70BACEZARvzPsgudbyC6SbDSAEJesRnJtOzni4fBw4ZBLH8plJOrIF6f7TEY7ZBblNPqC72W3UrVLUKE0BtkwTQZC67b6rPmNZBAZAvs0yzZBU6oh1idB8eoYwB2RhgIOokuNNeuOWoXh5FeaiEiEW6YkjrlivMB0ByvFt3IZAlZCO1G";
                        result.save(function(err, doc) {
                            done(err, doc);
                        });
                    } else {
                        done(err, result);
                    }
                }
            );
        }
    )
);

app.use(express.static(path.join(__dirname, "bower_components")));
app.use('/', auth);



passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({ access_token: token },
                function(err, user) {
                    if(err) {
                        return done(err)
                    }
                    if(!user) {
                        return done(null, false)
                    }

                    return done(null, user, { scope: 'all' })
                }
            );
        }
    )
);

/////////MeetUp//////////
// With text and latitude/longitude parameters
function getMeetUpEvents () {
meetup.getOpenEvents({'text':'Star Wars', 'lon': '-73.979431', 'lat': '40.752125', 'page' : '1'}, function(err,events) {
console.log(events);
});
}

getMeetUpEvents();
////////////////////////

app.use('/', index);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
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
});*/

module.exports = app;
