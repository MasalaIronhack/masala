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

$(document).ready(function() {
    getTasteKidAPIResults(randomTasteKid);
});
