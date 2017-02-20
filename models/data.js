const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new mongoose.Schema({
  type : Object
   });



var Data= mongoose.model('Data', DataSchema);
