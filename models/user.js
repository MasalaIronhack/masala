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
       fbid : {
         type : Number
       },
       datas : {
           type : Schema.Types.Mixed
       }

   });



//userSchema.set('timestamps', true);

var User = mongoose.model('User', UserSchema);

module.exports = User;
