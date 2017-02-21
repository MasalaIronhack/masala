FB.init({
  appId      : '864439233697725',
  status     : true,
  xfbml      : true,
  version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});


function saveTo(data){
$.ajax({
      url: "'mongodb://localhost/masala/users",
      method: "POST",
      data:    data,
      success: (response) =>{
        console.log('success!');
        console.log(response);
      },
      error:   handleError
    })
}



function getFBData () {
  FB.api(
  '/me',
  'GET',

  {"fields":"music,books,likes,events,movies,television,games,friendlists,taggable_friends",
    "access_token" :"EAAMSMZCF0V70BACEZARvzPsgudbyC6SbDSAEJesRnJtOzni4fBw4ZBLH8plJOrIF6f7TEY7ZBblNPqC72W3UrVLUKE0BtkwTQZC67b6rPmNZBAZAvs0yzZBU6oh1idB8eoYwB2RhgIOokuNNeuOWoXh5FeaiEiEW6YkjrlivMB0ByvFt3IZAlZCO1G"},
  function(response) {
    console.log(response);
    var datas = response;
    return datas;

    }
  );
}


$


function showFeedback (postResponse) {
console.log('post success');
console.log(postResponse);
}

function handleError (err) {
console.log('Oh no! Error:');
console.log(err);
}



$(document).ready(function() {
getFBData();




});
