$(document).ready(function() {
    FB.login(function(response) {
        if (response.status == 'connected') {
            var user_id = response.authResponse.userID;
            var page_id = "40796308305"; // coca cola page https://www.facebook.com/cocacola
            var fql_query = "SELECT uid FROM page_fan WHERE page_id=" + page_id + " and uid=" + user_id;

            FB.api('/me/likes/'+page_id, function(response) {
                if (response.data[0]) {
                    $("#container_like").show();
                } else {
                    $("#container_notlike").show();
                }
            });
        } else {
            // user is not logged in
        }
    });
});
