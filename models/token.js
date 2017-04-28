var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
  token : String
});

var Token = mongoose.model('token', tokenSchema);

module.exports = Token