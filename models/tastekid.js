const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TasteKidSchema = new mongoose.Schema(
   {
     books: [String],
     movies: [String],
     games: [String],
     user: { type: Schema.Types.ObjectId, ref: 'User' },
   }
 );

var TasteKid = mongoose.model('TasteKid', TasteKidSchema);
module.exports = TasteKid;
