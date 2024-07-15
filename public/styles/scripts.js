$(document).ready(function() {
    $('#menuToggle').click(function() {
        $('#sidebar').toggleClass('active');
    });

    $('#closeBtn').click(function() {
        $('#sidebar').removeClass('active');
    });
});
