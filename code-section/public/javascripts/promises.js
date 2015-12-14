$(function(){
  $.get('http://localhost:3000/posts/get-users')
    .then(function(users){
      for(var index in users){
        $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
      }

      return $.get('http://localhost:3000/posts/get-posts');
    })
    .then(function(posts){
      for(var index in posts){
        $('.get-posts').append('<li>'+JSON.stringify(posts[index])+'</li>');
      }

      return $.get('http://localhost:3000/posts/get-comments');
    })
    .then(function(comments){
      for(var index in comments){
        $('.get-comments').append('<li>'+JSON.stringify(comments[index])+'</li>');
      }
    }, handleError);
});

function handleError(xhr, status, error){
  console.log(error);
}
