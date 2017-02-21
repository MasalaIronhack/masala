//require('dotenv').config();
function showFeedback (postResponse) {
  console.log('post success');
  console.log(postResponse);
}

function handleError (err) {
  console.log('Oh no! Error:');
  console.log(err);
}


FB.init({
  appId      : '864439233697725',
  status     : true,
  xfbml      : true,
  version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});


function getFBData () {
  FB.api('/me',
         'GET',
        {"fields":"music,books,likes,events,movies,television,games,friendlists,taggable_friends",
         "access_token" :"EAAMSMZCF0V70BAEb1uJARIzewWqPY20l6WzZAb8fLqshbz1bwl3QsJdNzFqItPh2JsXn5FpERx1s7abvxZCpPka0IHhpXlwPAeaXZBRN0n6ZAA2gZAin3ulOVHz4ZATM1NRWkmNjehosrV74foGiRalhjsZA3dMhQRfRZB3k9aaU8xMMeL63oPryN"
        },
            function(response) {
              console.log(response);
              let obj = {hola: "hola"};

              $.ajax({
                  type: "POST",
                  data: JSON.stringify(obj),
                  contentType: "application/json",
                  url:     '/account',
                  success: showFeedback,
                  error:   handleError
                });
            });    }



$(document).ready(function() {
  $('button').on('click', function(){
    console.log(datas);
  })
getFBData();


});
