const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TasteKidSchema = new mongoose.Schema(
   {
     books: [String],
     movies: [String],
     games: [String],
     userId: String,
   }
 );

var TasteKid = mongoose.model('TasteKid', TasteKidSchema);
module.exports = TasteKid;
