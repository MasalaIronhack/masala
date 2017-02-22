const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new mongoose.Schema(
    {
      content : {type : Schema.Types.Mixed  },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
    }
  );



var Data= mongoose.model('Data', DataSchema);
