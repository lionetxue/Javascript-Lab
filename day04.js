
jQuery(document).ready(function() {
    var choice;
    $('#cross').click( function(){
        choice = "x";
    });

    $('#circle').click(function(){
        choice = "O";
    });

    $('.row').click(function () {
        $(this).text(choice); 
    }); 
});