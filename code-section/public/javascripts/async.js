$(function(){
  $.get('http://localhost:3000/posts/get-users')
    .then(function(users){
      insertUsers(users);
    });

  $('ul').on('click','.user',function(e){
    e.preventDefault();
    var uid = $(this).data('uid');
    async.waterfall([
      function(callback){
        $.get('http://localhost:3000/posts/get-user/'+uid, function(data){
          var postsPromises = insertUserDetail(data);
          Promise.all(postsPromises).then(function(posts){
            callback(null, posts);
          });
        });
      },
      function(posts, callback){
        var commentPromises = insertUserPost(posts);
        Promise.props(commentPromises).then(function(comments){
          callback(null, comments);
        });
      },
      function(comments, callback){
        insertComment(comments);
      }
    ], function(err, results){
      console.log(results);
    });
  });
});

function getUser(id){
  return new Promise(function (resolve, reject) {
      $.get('http://localhost:3000/posts/get-user/'+uid).then(resolve,reject);
    }
  );
}

function insertUsers(users){
  for(var index in users){
    var a = users[index];
    $('.get-users').append(`<li>
      <a data-uid="${a._id}" class="user">${a.name}</a>
    </li>`);
  }
}

function insertUserDetail(user){
  var promises = [];
  $('.user-data').html(`
    <p> Name: ${user.name} </p>
    <p> Username: ${user.username} </p>
  `);

  user.posts.forEach(function(val, key){
    var p = $.get('http://localhost:3000/posts/get-post/'+ val);
    promises.push(p);
  });

  return promises;
}

function insertUserPost(posts){
  var postsHTML = `<p> Posts of User </p><ul>`;
  var commentPromise = {};

  posts.forEach(function(val, key){
    var promises = [];
    postsHTML += `<li class="${val._id}">
      <p>Tag: ${val.title},  Description: ${val.description}</p>
      <p>Comments: </p><ul class= "comment-section"></ul>
    </li>`;

    val.comments.forEach(function(val, key){
      var p = $.get('http://localhost:3000/posts/get-comment/'+ val);
      promises.push(p);
    });
    commentPromise[val._id] = Promise.all(promises);
  });
  postsHTML += '</ul>';

  $('.user-post').html(postsHTML);

  return commentPromise;
}

function insertComment(comments){
  Object.keys(comments).forEach(function(val, key){
    var commentsHTML = ``;
    comments[val].forEach(function(value, key){
      commentsHTML += `<li>${value.description}</li>`;
    });
    $('.'+val).find('.comment-section').append(commentsHTML);
  });
}
