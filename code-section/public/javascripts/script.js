$(function(){
  $.get('http://localhost:3000/posts/get-users', function(users){

    for (var index in users) {
      $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
      var _posts = users[index].posts;

      for (var _index in _posts){
        $.get('http://localhost:3000/posts/get-post/'+_posts[_index], function(post){
          $('.get-posts').append('<li>'+JSON.stringify(post)+'</li>');
          var _comments = post.comments;

          for (var _commentIndex in _comments){
            $.get('http://localhost:3000/posts/get-comment/'+_comments[_commentIndex], function(comment){
              $('.get-comments').append('<li>'+JSON.stringify(comment)+'</li>');
            });
          }
        });
      }
    }
  });
});
