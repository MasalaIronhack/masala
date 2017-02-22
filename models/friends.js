const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FriendSchema = new mongoose.Schema(
   {
     friends: [String],
     user: { type: Schema.Types.ObjectId, ref: 'User' },
   }
 );

var Friend = mongoose.model('Friend', FriendSchema);
module.exports = Friend;
