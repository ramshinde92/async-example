var express = require('express');
var router = express.Router();
var Post = require('../schemas/posts.js');
var User = require('../schemas/users.js');
var Comment = require('../schemas/comments.js');

router.get('/posts', function(req, res, next){
  res.render('posts.jade', {title: 'List of all posts'});
});

router.get('/get-post/:id', function(req, res, next){
  Post.findById(req.params.id, function(err, post){
    if(err){
      console.log(err);
    }else{
      console.log(post);
      res.json(post);
    }
  });
});

router.get('/get-comment/:id', function(req, res, next){
  Comment.findById(req.params.id, function(err, comment){
    if(err){
      console.log(err);
    }else{
      console.log(comment);
      res.json(comment);
    }
  });
});

router.get('/get-posts', function(req, res, next){
  var _users = [];
  Post.find({},function(err, users){
    if(err){
      console.log(err);
    }else{
      for(var i=0; i<users.length; i++){
        _users.push(users[i]);
      }
      res.json(_users);
    }
  });
});

router.get('/get-comments', function(req, res, next){
  var _users = [];
  Comment.find({},function(err, users){
    if(err){
      console.log(err);
    }else{
      for(var i=0; i<users.length; i++){
        _users.push(users[i]);
      }
      res.json(_users);
    }
  });
});

router.get('/get-users', function(req, res, next){
  var _users = [];
  User.find({},function(err, users){
    if(err){
      console.log(err);
    }else{
      for(var i=0; i<users.length; i++){
        _users.push(users[i]);
      }
      res.json(_users);
    }
  });
});

router.get('/new-post', function(req, res, next){
  var _users = [];
  User.find({},function(err, users){
    if(err){
      console.log(err);
    }else{
      for(var i=0; i<users.length; i++){
        _users.push(users[i]);
      }
      res.render('new-post.jade', {title: 'Add New User', users: _users});
    }
  });
});

router.post('/new-post', function(req, res, next){
  if(req.body.comment){
    var _comment = new Comment({
      description: req.body.comment,
      comment_by: req.body.comment_by
    });

    _comment.save(function(err){
      if(err) throw err;
      var _post = new Post({
        title: req.body.title,
        description: req.body.description,
        from: req.body.users,
        comments: _comment._id
      });
      _post.save(function(err){
        if(err) throw err;
        console.log(_post, "Saved successfully");
        res.redirect('/posts/new-post');
      });
    });
  }
});

router.get('/add-user', function(req, res, next){
  var _posts = [];
  Post.find({},function(err, posts){
    if(err){
      console.log(err);
    }else{
      for(var i=0; i<posts.length; i++){
        _posts.push(posts[i]);
      }
      // console.log("_posts outside loop ", _posts);
      res.render('add-user.jade', {title: 'Add New User', posts: _posts});
    }
  });
});

router.post('/add-user', function(req, res, next){
  // console.log(req.body);
  // res.redirect('/posts/add-user');
  var _user = new User({
    name: req.body.name,
    username: req.body.username,
    posts: [req.body.posts]
  });

  _user.save(function(err){
    if(err) throw err;
    console.log("User Saved successfully");
    res.redirect('/posts/new-post');
  });
});

router.get('/add-post', function(req, res, next){
  res.render('add-post.jade', {title: 'Add New Post'});
});

router.post('/add-post', function(req, res, next){
  var _post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  _post.save(function(err){
    if(err) throw err;
    console.log('Posts saved successfully');
    res.redirect('/');
  });
});

module.exports = router;
