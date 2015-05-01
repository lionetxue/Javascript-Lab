/**
 * Created by lin on 5/1/15.
 */

$(document).ready(function () {
    var sec  = 0;
    var min  = 0;
    var timerset = false;
    var running = false;
    $('#start').attr("disabled", false);

    displayTime();

    $('.marker').click( function() {
       min = this.id;
        displayTime();
        timerset = true;
    });

    $('#start').click (function () {
        if(timerset) {
            running = true;
            if (min > 0) {
                min -= 1;
                sec = 60;
            }
            countdown();
            $('#start').attr("disabled", true);
        }
        else{
            alert ("You have not set the timer.");
        }
    });

    $('#stop').click( function () {
        running = false;
        timerset = false;
        $('#sound')[0].innerHTML = "";
        $('#start').attr("disabled", false);
    });

    $('#reset').click( function () {
        running = false;
        timerset = false;
        sec = 0;
        min = 0;
        $('#sound')[0].innerHTML = "";
        $('#start').attr("disabled", false);
        displayTime();
    });

    function displayTime() {
        makeDigitalOnes(sec, 'sec_ones');
        makeDigitalOnes(min, 'min_ones');

        makeDigitalTens(sec, 'sec_tens');
        makeDigitalTens(min, 'min_tens');
    };

    function countdown() {
        setTimeout(function () {
            if (running) {
                if(min==0 && sec==0) {
                    playSound();
                }
                else {
                    sec--;

                    if (sec == 0 && min!=0) {
                        sec = 60;
                        min -= 1;
                    }

                    displayTime();
                    countdown();
                }
            }
        }, 1000);
    };

    function playSound(){
        $('#sound')[0].innerHTML = "<audio autoplay><source src='audio/Alarm-Buzzer.wav' type='audio/wav'></audio>";
    }

    function makeDigitalOnes(time, unit) {
        var ones = time % 10;

        makeNum(ones, unit);
    };

    function makeDigitalTens(time, unit) {
        var tens = Math.floor(time/10);

        makeNum(tens, unit);
    };

    function makeNum(num, unit) {
        var unit = '.' + unit;

        if (num == 0) {
            $(unit + '.bar').show();
            $(unit + '.hor.mid').hide();
        }
        if (num == 1) {
            $(unit + '.bar').hide();
            $(unit + '.ver.top.right,' + unit + '.ver.bottom.right').show();
        }
        if (num == 2) {
            $(unit + '.bar').show();
            $(unit + '.ver.top.left,' + unit + '.ver.bottom.right').hide();
        }
        if (num == 3) {
            $(unit + '.bar').show(),
                $(unit + '.ver.top.left,' + unit + '.ver.bottom.left').hide();
        }
        if (num == 4) {
            $(unit + '.bar').show();
            $(unit + '.hor.top,' + unit +  '.hor.bottom,' + unit + '.ver.bottom.left').hide();
        }
        if (num == 5) {
            $(unit + '.bar').show();
            $(unit + '.ver.top.right,' + unit + '.ver.bottom.left').hide();
        }
        if (num == 6) {
            $(unit + '.bar').show();
            $(unit + '.ver.top.right').hide();
        }
        if (num == 7) {
            $(unit + '.bar').hide();
            $(unit + '.ver.top.right,' + unit + '.ver.bottom.right,' + unit + '.hor.top').show();
        }
        if (num == 8) {
            $(unit + '.bar').show();
        }
        if (num == 9) {
            $(unit + '.bar').show();
            $(unit + '.ver.bottom.left').hide();
        };
    };
});



