//require('dotenv').config();
var user_token = "EAAMSMZCF0V70BAMjgyqLsI8ZBCZAhKmFnZCcFbbd6WFZC2zCFHSIuEI0bJWQcFPXkWgi3R0CdJJ62H5Kk28j4zsItnXH2fqMoiooXN5sDqWFd7FBBRXimWPytpF3gC90Cx80lAItoRu8mHUjZBIfKTDWMvR8x585xbLCWaaZAgplgLaJ8IJZA2PB"
function showFeedback (postResponse) {
  console.log('post success');
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
    sortedDatas.latitude = coord.latitude;
    sortedDatas.longitude = coord.longitude;


    console.log("sortdataLATinside ",coord.latitude);
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
                });

             console.log("apiLocCall",coordinates);

            let obj = {
                userDatas: sortDatas(response, coordinates),
                locations: coordinates
            };
            console.log("beforeAJAX",obj.userDatas.longitude)
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

function getTasteKidAPIResults(randomTasteKid, searchType) {

    var params = {
        k: '260998-Masala-6RJUMGXP',
        type: searchType,
        q: randomTasteKid,
        info: 1,
        limit: 10,
    };

    $.ajax({
        url: 'https://www.tastekid.com/api/similar',
        dataType: 'jsonp',
        data: params,
        type: 'GET',
        success: function(response) {
            console.log(response.Similar.Results[0].Name);
            const newTKrecomendation = `${response.Similar.Results[0].Name}`;

            $('#TK').append(newTKrecomendation);

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
    getTasteKidAPIResults(randomTasteKid);

});
