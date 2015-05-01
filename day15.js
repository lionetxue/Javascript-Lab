/**
 * Created by lin on 4/30/15.
 */
$(document).ready(function () {
    var level = 1;
    var curPattern = [];
    var i = 0;
    var bulbid;
    var score = 0;

    $('button').on('click', function () {
        $('#modal').hide();
        makePattern();
    });

    function getAttempt() {
        var attempt = [];
        var i = 0;

        $('.bulb').click( function () {
            var clicked = this.id;
            attempt.push(clicked);
            lightPad(clicked);

            if (attempt[i] != curPattern[i]) {
                $('.bulb').off();
                $('#fail').show().fadeOut('slow');
                curPattern = [];
                level = 0;
                score = 0;
                setTimeout(function () {
                    makePattern();
                }, 800);
            } else if (curPattern.length == attempt.length) {
                $('.bulb').off();
                level++;
                score+=level;
                makePattern();
            } else {
                i++;
            }
        });
    };

    function flashPattern() {
        setTimeout(function () {
            if (i < curPattern.length) {
                lightPad(curPattern[i]);
                i++;
                flashPattern();
            } else {
                i = 0;
                getAttempt();
            }
        }, 500);
    };

    function makePattern() {
        $('#level').text('Level ' + level);
        $('#score').text('Score ' + score);
        bulbid = Math.floor(Math.random() * 9);
        setTimeout(function () {
            curPattern.push(bulbid);
            flashPattern();
        }, 500);
    };


    function lightPad(bulbid) {
        $('#' + bulbid).addClass('glow');
        setTimeout(function () {
            $('#' + bulbid).removeClass('glow');
        }, 300);
    };
});