var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  description: String,
  comment_by: { type: String, ref: 'User' }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
