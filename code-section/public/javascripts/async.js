$(function(){
  async.series([
    function(callback){
      $.get('http://localhost:3000/posts/get-users')
        .then(function(users){
          callback(null, users);
        });
    },
    function(callback){
      
    }
  ],
  function(err, results){
    console.log(results);
  });
});
