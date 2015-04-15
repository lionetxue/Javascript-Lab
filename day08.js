
$(document).ready(function () {
	var canvas = $('canvas')[0];
	ctx = canvas.getContext('2d');
	var h = window.innerHeight;
	var w = window.innerWidth;
	canvas.height = h;
	canvas.width = w;
	var balloons = [];

	init();

	function init() {
		for (var i = 0; i < 20; i++) {
			balloons.push(new Balloon());
		}
		makeBalloon();
	};

	function Balloon() {
		var that = {};
		that.x = randomInt(65, (w-65));
		that.y = randomInt((h + 70), (h + 100));
		that.speed = Math.random() * 3;
		that.size = Math.random() * 60 + 25;

		function get_random_color() {
			function c() {
				return Math.floor(Math.random()*256).toString(16)
			}
			return "#"+c()+c()+c();
		}
		that.color = get_random_color();
		that.pop = function (i) {
			balloons[i] = new Balloon();
		}
		return that;
	};

	function makeBalloon() {
		ctx.clearRect(0,0,w,h);
		jQuery.each(balloons, function (i, b){
			var balloon= new CANVASBALLOON.Balloon('balloon_canvas', b.x, b.y, b.size, b.color);
			balloon.draw();
			if (b.y < 0 - b.size * 2) {
				balloons[i] = new Balloon;
			}
			b.y -= b.speed;
		});
		setTimeout(makeBalloon, 20);
	};

	$('canvas').click( function(e) {
		var clickX = e.pageX;
		var clickY = e.pageY;

		jQuery.each(balloons, function(i, b) {
			if ((clickX < b.x + b.size && clickX > b.x - b.size) && (clickY < b.y + b.size && clickY > b.y - b.size)) {
				b.pop(i);
			}
		});
	});

});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};


