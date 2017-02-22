//require('dotenv').config();
var user_token = "EAAMSMZCF0V70BAMZCUGjGn0STNZC9I1mr7QnE2NVbam2wZAaR2G499VKJLyMSDzd4J5XZC1eUFR8FblLZCZCN8nNjJs6T2XYRwCx1bNewYtbKZAstZAGuqyF57NTWTNVZCllHZCislYXAleNPaiNAUDdCGUKwuJu8tO6PwZCbiqpGVx7ZCbujTAXEZB6Mn"
function showFeedback (postResponse) {
  console.log('post success');
  //console.log(postResponse);
}

function handleError(err) {
    console.log('Oh no! Error:');
    console.log(err);
}

var sortedDatas = {};

function sortDatas(obj, coord) {

    sortedDatas.books = obj.books.data.map((book) => book.name);
    sortedDatas.movies = obj.movies.data.map((movie) => movie.name);
    sortedDatas.likes = obj.likes.data.map((like) => like.name);
    sortedDatas.events = obj.events.data.map((event) => event.name);
    sortedDatas.music = obj.music.data.map((mus) => mus.name);
    sortedDatas.taggable_friends = obj.taggable_friends.data.map((friend) => friend.name);
    sortedDatas.television = obj.television.data.map((tv) => tv.name);
    sortedDatas.coordinates = coord;


    console.log(sortedDatas);
    return sortedDatas;
}


FB.init({
    appId: '864439233697725',
    status: true,
    xfbml: true,
    version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});



function getFBData() {
    ////////////////////////////First request to get user datas
    FB.api('/me',
        'GET',

        {
            "fields": "music,books,likes,events,movies,television,games,friendlists,taggable_friends,location",
            "access_token": user_token
        },
        function(response) {
            console.log(response);
            var locationID = response.location.id;
            var coordinates = {};
            /////////////////Second request to get user location
            FB.api('/' + locationID,
                'GET', {
                    "fields": "location",
                    "access_token": user_token
                },
                function(response) {
                    coordinates.latitude = response.location.latitude;
                    coordinates.longitude = response.location.longitude;
                    //console.log(response);
                });

            console.log(response);

            sortDatas(response, coordinates);
            let obj = {
                userDatas: sortedDatas
            };

            $.ajax({
                type: "POST",
                data: JSON.stringify(obj),
                contentType: "application/json",
                url: '/account',
                success: showFeedback,
                error: handleError
            });
        });
}


////////////TasteKid////////////

// We must declare "searchTerm" variable with Facebook movie/books/music/authors parameters

// type: specifies the desired type of results. It can be one of the following:
// music, movies, shows, books, authors, games.
// If not specified, the results can have mixed types.

function getTasteKidAPIResults(searchTerm, searchType) {

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
            const newCharacterHtml = `
    <li>
      <h3> ${response} </h3>
    </li>
  `;

            $('#characters-list').append(newCharacterHtml);

        },
        error: function(response) {
            console.error(response);
        }
    });
}
////////////TasteKid////////////

////////////Functions init////////////
$(document).ready(function() {

    getFBData();
    getTasteKidAPIResults('Titanic');

});
