$(document).ready(function () {
	var animations = [ 'shake',
		'hop',
		'spin',
		'grow',
		'hooray' ];

	function getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	$('.jello_box').click( function () {
		var jello = this;
		var animation = animations[getRandomInt(0, 4)];

		$(jello).addClass(animation);

		setTimeout(function () {
			$(jello).removeClass(animation);
		}, 2100);
	});


});