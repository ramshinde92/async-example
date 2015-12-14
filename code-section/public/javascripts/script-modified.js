var $status = $('#status');

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/posts/get-users', //GETting a JSON file acts just like hitting an API
  success: function(users) {
    $status.append('<li>got users</li>');
    console.log("Success");
    for (var index in users) {
      $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
      var _posts = users[index].posts;
      for(var _index in _posts){
        $.ajax({
          type: 'GET',
          url: 'http://localhost:3000/posts/get-post/'+_posts[_index],
          success: function(post) {
            console.log("Success");
            $status.append('<li>got posts</li>');
            $('.get-posts').append('<li>'+JSON.stringify(post)+'</li>');

            var _comments = post.comments;
            for(var _commentIndex in _comments){
              $.ajax({
                type: 'GET',
                url: 'http://localhost:3000/posts/get-comment/'+_comments[_commentIndex],
                success: function(comment) {
                  console.log("Success");
                  $status.append('<li>got comments</li>');
                  $('.get-comments').append('<li>'+JSON.stringify(comment)+'</li>');
                },
                error: function(xhr, status, error) {
                  console.log(error);
                }
              });
            }
          },
          error: function(xhr, status, error) {
            console.log(error);
          }
        });
      }
    }
  },
  error: function(xhr, status, error) {
    console.log(error);
  }
});
