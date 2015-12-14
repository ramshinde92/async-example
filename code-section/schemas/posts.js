var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  description: String,
  from: {type: String, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
