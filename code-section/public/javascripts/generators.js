Promise.coroutine(function* (){

  var users = yield $.get('http://localhost:3000/posts/get-users');
  insertUsers(users); // insert users

  $('ul').on('click', '.user', function(e){
    e.preventDefault();

    var uid = $(this).data('uid');

    Promise.coroutine(function* (){
      var user = yield $.get('http://localhost:3000/posts/get-user/'+ uid);

      var postPromises = insertUserDetail(user); // insert a user info and return promises array of posts
      var _posts = yield Promise.all(postPromises);

      var commentPromises = insertUserPost(_posts);
      var _comments = yield Promise.props(commentPromises);

      insertComment(_comments);

    })().catch(handleError);

  });
})().catch(handleError);


function insertUsers(users){
  for(var index in users){
    var user = users[index];
    $('.get-users').append(`<li>
      <a data-uid="${user._id}" class="user">${user.name}</a>
    </li>`);
  }
}

function insertUserDetail(user){
  var promises = [];
  console.log("Inside user details");
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

function insertUserPost(_posts){
  var postsHTML = `<p> Posts of User </p><ul>`;
  var commentPromise = {};

  _posts.forEach(function(val, key){
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

function insertComment(_comments){
  Object.keys(_comments).forEach(function(val, key){
    var commentsHTML = ``;
    _comments[val].forEach(function(value, key){
      commentsHTML += `<li>${value.description}</li>`;
    });
    $('.'+val).find('.comment-section').append(commentsHTML);
  });
}

function handleError(errs){
  console.log(errs);
}
