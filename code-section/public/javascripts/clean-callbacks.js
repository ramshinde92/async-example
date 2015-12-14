$(function(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts/get-users',
    success: getPosts,
    error: handleError
  });
});

function getPosts(users){
  for(var index in users){
    $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
  }
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts/get-posts',
    success: getComments,
    error: handleError
  });
}

function getComments(posts){
  for(var index in posts){
    $('.get-posts').append('<li>'+JSON.stringify(posts[index])+'</li>');
  }
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/posts/get-comments',
    success: function(comments){
      for(var index in comments){
        $('.get-comments').append('<li>'+JSON.stringify(comments[index])+'</li>');
      }
    },
    error: handleError
  });
}

function handleError(xhr, status, error){
  console.log(error);
}
