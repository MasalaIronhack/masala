FB.init({
  appId      : '864439233697725',
  status     : true,
  xfbml      : true,
  version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});





function getFBData () {
  FB.api(
  '/me',
  'GET',

  {"fields":"music,books,likes,events,movies,television,games,friendlists,taggable_friends",
    "access_token" :"EAAMSMZCF0V70BANvQAr5UUB0Riv2GoamRMIQUNwAn9LM0on4ZANA7lZC7R2Q6uxzgLjjXZCY1O7ORK1sCLV74W4EbHmHovz5EiSnuZAZAtVsRJXKphyZBqNO74PN5OB1K9eiYfHWaGMoMVjJpBdA8WUHVxAZCMddURmd7odparZARw8vHE36WZAxlr"},
  function(response) {
    console.log(response);
      // Insert your code here
    }
  );
}

$(document).ready(function() {
getFBData();
getFriends();
});
