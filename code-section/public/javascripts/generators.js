Promise.coroutine(function* (){

  var users = yield $.get('http://localhost:3000/posts/get-users');
  for(var index in users){
    $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
  }

  var posts = yield $.get('http://localhost:3000/posts/get-posts');
  for(var index in posts){
    $('.get-posts').append('<li>'+JSON.stringify(posts[index])+'</li>');
  }

  var comments = yield $.get('http://localhost:3000/posts/get-comments');
  for(var index in comments){
    $('.get-comments').append('<li>'+JSON.stringify(comments[index])+'</li>');
  }
})().catch(function(errs){
  console.log(errs);
});
