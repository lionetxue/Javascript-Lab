/**
 * Created by lin on 5/8/15.
 */
(function($){
    $.fn.disableSelection = function() {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };
})(jQuery);

$(document).ready( function () {

    var w = window.innerWidth;
    var magneticWords =  "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z".split(', ');
    $('body').disableSelection();

    _.each(magneticWords, function (word) {
        var letterColor = get_random_color();
        $('<div>', {
            class: 'magnet',
            style: 'position:absolute',
            text: word
        }).css({
            top: Math.random()*200,
            left: Math.random()*w*0.75 + 140,
            color: letterColor

        }).draggable().appendTo('#magnet_container');
    });

});

function get_random_color() {
    function c() {
        return Math.floor(Math.random()*256).toString(16)
    }
    return "#"+c()+c()+c();
}

