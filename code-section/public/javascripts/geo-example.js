$(function(){
  getGeoLocation().then(function(geoPosition){
    console.log(geoPosition);
  });
});

function getGeoLocation(){
  var defer = $.Deferred();
  window.navigator.geolocation.getCurrentPosition(function(geo){
    defer.resolve(geo);
  });

  return defer.promise();
}
