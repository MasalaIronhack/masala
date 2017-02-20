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
                        result.access_token = "EAAMSMZCF0V70BANvQAr5UUB0Riv2GoamRMIQUNwAn9LM0on4ZANA7lZC7R2Q6uxzgLjjXZCY1O7ORK1sCLV74W4EbHmHovz5EiSnuZAZAtVsRJXKphyZBqNO74PN5OB1K9eiYfHWaGMoMVjJpBdA8WUHVxAZCMddURmd7odparZARw8vHE36WZAxlr";
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
