const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
        name : {
          type: String
        } ,
       facebookId: {
           type: String
       },
       access_token: {
           type: String
       },
       userDatas : {}
   });



   UserSchema.statics.findOneOrCreate = function(filters, cb) {
       User = this;
       this.find(filters, function(err, results) {
           if(results.length == 0) {
               var newUser = new User();
               newUser.facebookId = filters.facebookId;
               newUser.save(function(err, doc) {
                   cb(err, doc)
               });
           } else {
               cb(err, results[0]);
           }
       });
   };


//userSchema.set('timestamps', true);

var User = mongoose.model('User', UserSchema);

module.exports = User;
