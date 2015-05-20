(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

$(document).ready(function () {
	var length = 10;

	$('button').on('mousedown', function () {
		setButton();
	});

	function progressBar() {
		setTimeout(function () {
			$('.progress_window').show();

			$('.inner_bar').css('width', length);

			incrementBar();
		}, 100);
	};

	function incrementBar() {
		length++;

		if (length > 395) {
			length = 10;

			$('button').removeClass('disable').addClass('able').on('mousedown', function () {
				setButton();
			});
			$('.progress_window').hide();
			$('#hint').hide();
			$('.inner_bar').css('width', 10);
			$('#text_bubble').show();
			playSound();

		} else {
			$('.inner_bar').css('width', length);
			setTimeout(incrementBar, 20);
		}
	};

	function setButton () {
		$('button').addClass('disable').removeClass('able').off();
		$('p').fadeOut('fast');
		$('#text_bubble').hide();
		$('#sound')[0].innerHTML = "";
		progressBar();
	};
	
	function playSound(){
        $('#sound')[0].innerHTML = "<audio autoplay><source src='audio/Staples-EasyButton.mp3' type='audio/mpeg'></audio>";
    }

	$('body').disableSelection();
	
});