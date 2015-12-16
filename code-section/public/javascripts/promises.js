$(function(){
  $.get('http://localhost:3000/posts/get-users')
    .then(function(users){
      var ids = [];
      for(var index in users){
        $('.get-users').append('<li>'+JSON.stringify(users[index])+'</li>');
        ids.push(getID(users[index].posts));
      }

      return getMultiple(ids, getPost);
    })
    .then(function(posts){
      var ids = [];
      for(var index in posts){
        $('.get-posts').append('<li>'+JSON.stringify(posts[index])+'</li>');
        ids.push(getID(posts[index].comments));
      }

      return getMultiple(ids, getComment);
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

function getPost(id){
  return $.get('http://localhost:3000/posts/get-post/'+id).then(function(data, status, xhr){
    return data;
  });
}

function getComment(id){
  return $.get('http://localhost:3000/posts/get-comment/'+id).then(function(data, status, xhr){
    return data;
  });
}

function getMultiple(ids, getReq){
  var promises = ids.map(getReq);

  return $.when.apply($, promises).then(function(){
    return $.makeArray(arguments);
  });
}

function getID(obj){
  var id = "";
  for(index in obj){
    id = obj[index];
  }
  return id;
}
