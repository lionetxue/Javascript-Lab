/**
 * Created by lin on 4/29/15.
 */
$(document).ready(function () {
    var i = 0;

    $('body').click( function (e) {
        var facecolor = randomColor();

        $('#workspace').append('<div class="outer ' + i + '">' +
        '<div class="cube"> ' +
        '<div class="front"></div> ' +
        '<div class="back"></div> ' +
        '<div class="top"></div> ' +
        '<div class="bottom"></div> ' +
        '<div class="left"></div> ' +
        '<div class="right"></div> </div></div>');
        $('.' + i).css( {top: e.pageY-150, left: e.pageX-50});
        $('.' + i +' .cube div').css({background: facecolor});

        i += 1;
    });

});


function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
};