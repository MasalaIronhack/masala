FB.init({
    appId: '864439233697725',
    status: true,
    xfbml: true,
    version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
});


function saveTo(data) {
    $.ajax({
        url: "'mongodb://localhost/masala/users",
        method: "POST",
        data: data,
        success: (response) => {
            console.log('success!');
            console.log(response);
        },
        error: handleError
    });
}

function getFBData() {
    FB.api(
        '/me',
        'GET',

        {
            "fields": "music,books,likes,events,movies,television,games,friendlists,taggable_friends",
            "access_token": "EAAMSMZCF0V70BACEZARvzPsgudbyC6SbDSAEJesRnJtOzni4fBw4ZBLH8plJOrIF6f7TEY7ZBblNPqC72W3UrVLUKE0BtkwTQZC67b6rPmNZBAZAvs0yzZBU6oh1idB8eoYwB2RhgIOokuNNeuOWoXh5FeaiEiEW6YkjrlivMB0ByvFt3IZAlZCO1G"
        },
        function(response) {
            console.log(response);
            var datas = response;
            return datas;

        }
    );
}

function showFeedback(postResponse) {
    console.log('post success');
    console.log(postResponse);
}

function handleError(err) {
    console.log('Oh no! Error:');
    console.log(err);
}

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
