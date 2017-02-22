const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new mongoose.Schema(
    { content :
      {
          type : Schema.Types.Mixed
      }
    }
  );



var Data= mongoose.model('Data', DataSchema);
