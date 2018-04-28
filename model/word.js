var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
 // _id: mongoose.Schema.Types.ObjectId,
  word:{
    type: String,
    require:true
  },
  meaning: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require:true
  },
  subCategory: {
    type: String,
    require: true
  }
});

//var Word = mongoose.model('Word', wordSchema);
module.exports = mongoose.model('Word', wordSchema);