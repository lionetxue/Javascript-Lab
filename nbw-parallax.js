/*
 JavaScript for the demo: Recreating the Nikebetterworld.com Parallax Demo
 Demo: Recreating the Nikebetterworld.com Parallax Demo
 Author: Ian Lunn / modifications by Russ Maschmeyer
 Author URL: http://www.ianlunn.co.uk/ and http://www.strangenative.com
 Demo URL: http://www.ianlunn.co.uk/demos/recreate-nikebetterworld-parallax/ and
 Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/recreate-nikebetterworld-parallax/

 License: http://creativecommons.org/licenses/by-sa/3.0/ (Attribution Share Alike). Please attribute work to Ian Lunn simply by leaving these comments in the source code or if you'd prefer, place a link on your website to http://www.ianlunn.co.uk/.

 Dual licensed under the MIT and GPL licenses:
 http://www.opensource.org/licenses/mit-license.php
 http://www.gnu.org/licenses/gpl.html
 */

if (screen.width > 1024) {

    $(document).ready(function() { //when the document is ready...

        // save selectors as variables to increase performance
        var $window = $(window);

        // store every panel for speed
        var $BG1a 	= $('#title');
        var $BG1b 	= $('#title').find('.b');
        var $BG2a 	= $('#intro');						//text
        var $BG3a 	= $('#Xmas-eve');
        var $BG3b 	= $('#Xmas-eve').find('.b');
        var $BG3c 	= $('#Xmas-eve').find('.c');
        var $BG3d 	= $('#Xmas-eve').find('.d');
        var $BG3e 	= $('#Xmas-eve').find('.frame');	//frame
        var $BG4a 	= $('#keep-scroll');					//text
        var $BG5a 	= $('#waiting');
        var $BG5b	= $('#waiting').find('.b');		//
        var $BG5c 	= $('#waiting').find('.frame');	//frame
        var $BG6a 	= $('#the-end');					//text

        // other variables
        var windowHeight = $window.height();
        var windowWidth = $window.width();
        var panelHeight = $window.height();
        var panelWidth = $window.width();
        var positionOfBackground = (windowHeight/2) - (windowWidth/2);
        var pos = $window.scrollTop(); //position of the scrollbar
        var mainPanel = $BG1a;
        var vertShift = 0;
        var horShift = 0;

        // detect mobile
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i) ? true : false;
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) ? true : false;
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
            }
        };

        // apply the class "inview" to panels in view
        $('section').bind('inview', function (event, visible) {
            if (visible == true) {
                $(this).addClass("inview");
            } else {
                $(this).removeClass("inview");
            }
        });


        // if the browser window is resized...
        function Reposition(){
            windowHeight = $window.height(); // get new height
            windowWidth = $window.width(); // get new width

            // set the panel height
            if (windowHeight > 800) {
                panelHeight = 800;
            } else {
                panelHeight = windowHeight;
            }
            if ( isMobile.any() ) {
                panelHeight = 800;
            }
            $('.panel, .text').css('height', panelHeight);


            // set the panel width
            if (windowWidth > 1000) {
                panelWidth = 1000;
            } else {
                panelWidth = windowWidth;
            }
            horShift = (windowWidth - panelWidth) * .5;

            // place things
            $('.story').css('margin-top', (panelHeight * .5) - 210 ); // interstitial stories
            $('.credit').css('margin-top', panelHeight - 50);

            // figure out background size offset for middle placement
            positionOfBackground = (windowHeight / 2) - 500;

            // scroll controller
            if (windowHeight > 800) {
                vertShift = ((windowHeight - panelHeight) / 2);
            } else {
                vertShift = 0;
            }
            $('body').css('padding-top', vertShift);

            // hack: unbind first in case we already bound, then bind or re-bind the localScroll plugin
            $('#navigation').unbind('click').unbind('.localScroll');
            $('#navigation').localScroll({lazy:true, duration:2000, offset:-(vertShift)});
        }


        // Swap out next and prev href links and credit text
        function ChangeLinks(){
            $('#credit').html(mainPanel.attr('artist'));
            $('#credit').attr('href', mainPanel.attr('href'));
        }

        // Called every pixel scrolled. Sets position of the background image element
        /*arguments:
         orientation = alignment of bg image
         x = horizontal position of background
         windowHeight = height of the viewport
         pos = position of the scrollbar
         adjuster = adjust the position of the background
         inertia = how fast the background moves in relation to scrolling
         */
        function CalculateShift(valign, halign, pos, adjuster, vinertia, hinertia){

            var returnValue = '';
            var returnY = '';
            var returnX = '';

            // for vertical shift
            switch (valign) {
                case "top":
                    returnY = (-((panelHeight + pos) - adjuster) * vinertia) + "px";
                    break;
                case "middle":
                    returnY = ((-((panelHeight + pos) - adjuster) * vinertia) + positionOfBackground)  + "px";
                    break;
                case "bottom":
                    returnY = ((-((panelHeight + pos) - adjuster) * vinertia) + (positionOfBackground * 2)) + "px";
                    break;
                case "static":
                    returnY = 50 + "%";
                    break;
                default: ;//alert('defaulted');
            }

            // for horizontal shift
            switch (halign) {
                case "right":
                    returnX = horShift * 2 + (((panelHeight + pos) - adjuster) * hinertia) + "px";
                    break;
                case "center":
                    returnX = horShift + (((panelHeight + pos) - adjuster) * hinertia) + "px";
                    break;
                case "left":
                    returnX = (((panelHeight + pos) - adjuster) * hinertia) + "px";
                    break;
                case "static":
                    returnX = 50 + "%";
                    break;
                default: ;//alert('defaulted');
            }

            //put the string together & return it
            returnValue = returnX + ' ' + returnY;
            return returnValue;
        }

        // Called when window is scrolled or resized
        function Move(){

            if($BG1a.hasClass("inview")){ // Title
                $BG1b.css({'height': panelHeight}); // text
                if (pos <= (panelHeight / 2)) {
                    mainPanel = $BG1a;
                    ChangeLinks();
                }
            }

            if($BG2a.hasClass("inview")){ // Intro - text
                $BG2a.css({'backgroundPosition': 'center'}); // text
                if (pos >= (panelHeight / 2)) {
                    mainPanel = $BG2a;
                    ChangeLinks();
                }
            }

            if($BG3a.hasClass("inview")){ // Xmas-Eve
                $BG3a.css({'backgroundPosition': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .6, 0)}); // city
                $BG3b.css({'backgroundPosition': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .4, 0), 'height': panelHeight}); // stars
                $BG3c.css({'backgroundPosition': CalculateShift('middle', 'static', pos, (panelHeight * 3),  .2, 0), 'height': panelHeight}); // moon
                $BG3d.css({'backgroundPosition': CalculateShift('middle', 'static', pos, (panelHeight * 3), -.4, 0), 'height': panelHeight}); // jess
                $BG3e.css({'height': panelHeight}); // frame
                if (pos >= (panelHeight + (panelHeight / 2))) {
                    mainPanel = $BG3a;
                    ChangeLinks();
                }
            }

            if($BG4a.hasClass("inview")){ // About Her - text
                $BG4a.css({'backgroundPosition': 'center'}); // text
                if (pos >= ((panelHeight * 2) + (panelHeight / 2))) {
                    mainPanel = $BG4a;
                    ChangeLinks();
                }
            }

            if($BG5a.hasClass("inview")){ // Waiting
                var cuePos = (panelHeight * 4) - vertShift;

                if (pos <= cuePos) {
                    $BG5b.css({'height': panelHeight, 'background-position': '-500px, 0'}); // the hordes
                    $('#waiting').find('.wait').css('opacity', 0);
                } else {
                    $BG5b.css({'height': panelHeight, 'background-position': '-20px, 0'});
                    $('#waiting').find('.wait').css('opacity', 1);
                }

                $BG5c.css({'height': panelHeight}); // frame
                if (pos >= ((panelHeight * 3) + (panelHeight / 2))) {
                    mainPanel = $BG5a;
                    ChangeLinks();
                }
            }

            if($BG6a.hasClass("inview")){ // The End - text
                $BG6a.css({'backgroundPosition': 'center'}); // text
                if (pos >= ((panelHeight * 4) + (panelHeight / 2))) {
                    mainPanel = $BG6a;
                    ChangeLinks();
                }
            }

        }

        Reposition(); //Reposition various elements appropriately for the window size

        $window.resize(function(){ //if the user resizes the window...
            Reposition();
            Move();
        });

        $window.scroll(function(){
            if ( isMobile.any() ) {
                // do nothing
            } else {
                pos = $window.scrollTop();
                Move();
            }
        });

    });

} else {

    $(document).ready(function() { //when the document is ready...

        // alert('Visit the site out on your desktop or laptop to see it in all it\'s glory');

        // save selectors as variables to increase performance
        var $window = $(window);

        // other variables
        var windowHeight = $window.height();
        var windowWidth = $window.width();
        $('.panel').css('height', windowWidth);
        $('.panel, .story').css('background-size', windowWidth);
        $('#it-happened, #title').css('height', windowWidth * .65);
        $('#invitation.panel').css('height', 'auto');

        window.onorientationchange = function() {
            var windowHeight = $window.height();
            var windowWidth = $window.width();
            $('.panel').css('height', windowWidth);
            $('.panel, .story').css('background-size', windowWidth);
            $('#it-happened, #title').css('height', windowWidth * .65);
            $('#invitation.panel').css('height', 'auto');
        }
    });

}