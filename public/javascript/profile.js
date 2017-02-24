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
            const newUrl = `
            <a class="btn btn-primary btn-lg main-content-btn" href="https://en.wikipedia.org/wiki/Special:Search/${response.Similar.Results[0].Name}" role="button">Learn more</a>
            `;

            $('#TK').append(newTKrecomendation);
            $('#NW').append(newUrl);

        },
        error: function(response) {
            console.error(response);
        }
    });
}
////////////TasteKid////////////

$(document).ready(function() {

    getTasteKidAPIResults(randomTasteKid);

});
