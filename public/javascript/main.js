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
    appId: '864439233697725',
    status: true,
    xfbml: true,
    version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});



function getFBData () {
  FB.api('/me',
         'GET',
        {"fields":"music,books,likes,events,movies,television,games,friendlists,taggable_friends, location",
         "access_token" :"EAAMSMZCF0V70BAP8WOWRgUriENQROxXlbNAkyxVxWLmz2oruMO0oDp5VXvgMip1JNo1HR2Sz8cqy9CUMzHw4jg5xUlxPMF5ZCQHMWFl1jWa8hberGtRMPDZCUpHtJWH38aSZCxTsaMyDPoOmXsFC8mf2HllFxLHoHbeeBiZBBbI1riXwWtnoE"
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


////////////TasteKid////////////

// We must declare "searchTerm" variable with Facebook movie/books/music/authors parameters

// type: specifies the desired type of results. It can be one of the following:
// music, movies, shows, books, authors, games.
// If not specified, the results can have mixed types.

var getTasteKidAPIResults = function(searchTerm, searchType) {

    var params = {
        k: '260998-Masala-6RJUMGXP',
        type: searchType,
        q: searchTerm,
        info: 1,
        limit: 10,
    };


    $.ajax({
        url: 'https://www.tastekid.com/api/similar',
        dataType: 'jsonp',
        data: params,
        type: 'GET',
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            console.error(response);
        }
    });
};
////////////TasteKid////////////

////////////Functions init////////////
$(document).ready(function() {

    getFBData();
    getTasteKidAPIResults('Titanic');

});
