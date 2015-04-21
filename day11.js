/**
 * Created by lin on 4/20/15.
 */
$(document).ready(function () {

    (function( kitty, $, undefined ) {
        setprogress();

        //Private Property
        var health = 60;
        var love = 60;
        var happiness = 60;

        //Public Method
        kitty.feed = function() {
            health += randomInt(15,30);

            $('.mouth').addClass('feed');

            setTimeout(function () {
                $('.mouth').removeClass('feed');
            }, 1000);

            decrementVitalSigns('feed');
        };

        kitty.pet = function() {
            love += randomInt(15,30);
            $('#text_bubble p').text('Purr...');
            $('#text_bubble').show();
            $('#kitty_container').addClass('purr');

            setTimeout(function () {
                $('#kitty_container').removeClass('purr');
                $('#text_bubble').fadeOut('600');
            }, 3000);

            decrementVitalSigns('pet');
        };

        kitty.play = function() {

            happiness += randomInt(15,30);

            $('#kitty_container').addClass('play');

            setTimeout(function () {
                $('#kitty_container').removeClass('play');
            }, 1000);

            decrementVitalSigns('play');
        };

        //Private Method
        function decrementVitalSigns(action) {
            if (action == 'feed') {
                love -= randomInt(8,16);
                happiness -= randomInt(8,16);
            } else if (action == 'pet') {
                health -= randomInt(8,16);
                happiness -= randomInt(8,16);
            } else {
                health -= randomInt(8,16);
                love -= randomInt(8,16);
            }

            updateStats();
            styleKitty();

            if (health <= 0 || love <= 0 || happiness <= 0) {
                $('#module').show();
            }
        };

        function styleKitty() {
            if (health >= 80) {
                $('.body').css({left: 140,height:180, width:220});
            } else if (health >= 70) {
                $('.body').css({left: 150,height:180, width:200});
            } else if (health >= 60) {
                $('.body').css({left: 170, height:180, width:160});
            } else if (health >=40){
                $('.body').css({left: 180, height:180, width:140});
            } else{
                $('.body').css({left: 200, height:180, width:100});
            }

            var mouth = $('.mouth');
            if ((love < 20 )|| (happiness < 20) || (health < 20)) {
                mouth.addClass('frown');
                mouth.removeClass('smile');
                mouth.removeClass('joy');
            } else if (happiness >= 70) {
                mouth.addClass('joy');
                mouth.removeClass('smile');
                mouth.removeClass('frown');
            } else if (happiness < 60 && happiness >= 20) {
                mouth.addClass('smile');
                mouth.removeClass('joy');
                mouth.removeClass('frown');
            }

            if (love >= 80) {
                $('.head').css({backgroundColor: '#d6003d'});
            }  else if (love >=70){
                $('.head').css({backgroundColor: '#ff749c'});
            } else if (love >= 60) {
                $('.head').css({backgroundColor: '#FFB6C1' });
            } else if (love < 60 && love >= 30) {
                $('.head').css({backgroundColor: '#FFFFFA'});
            } else {
                $('.head').css({backgroundColor: '#d8e6d4'});
            }
        }

        function updateStats() {
            if (health <= 0 || love <= 0 || happiness <= 0) {
                $('#health').text('Health: XXX');
                $('#love').text('Love: XXX');
                $('#happiness').text('Happiness: XXX');
            } else {
                if(health>100) {
                    health = 100;
                }
                if(love>100) {
                    love=100;
                }
                if(happiness>100) {
                    happiness=100;
                }

                progress(health, $('.healthBar'));

                progress(love, $('.loveBar'));

                progress(happiness, $('.happinessBar'));
            }
        }

        function setprogress() {
            $('.progressBar').each(function() {
                var bar = $(this);
                var max = bar.attr('data-value');
                progress(max, bar);
            });
        }


    }( window.kitty = window.kitty || {}, jQuery ));

    $('#btn_feed').click( kitty.feed);
    $('#btn_pet').click( kitty.pet);
    $('#btn_play').click( kitty.play);

});

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min ) + min);
};
