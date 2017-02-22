$(document).ready(function() {
    console.log("ready!");
    $(document).on('click', ".anchorLink", function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
});
