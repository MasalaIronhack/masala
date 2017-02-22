const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema(
   {
     friends: [String],
   }
 );

var Friend = mongoose.model('Friend', FriendSchema);
module.exports = Friend;
