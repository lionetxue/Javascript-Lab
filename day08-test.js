$(document).ready(function () {
	var canvas = $('canvas')[0],
		ctx = canvas.getContext('2d'),
		h = window.innerHeight ,
		w = window.innerWidth,
		ballons = [];

	canvas.height = h;
	canvas.width = w;	

	init();

	$('button').on('click', function (e) {
		e.stopPropagation();
		for (var i = 0; i < 10; i++) {
			ballons.push(new Ballon());
		}

	})

	$('#canvas').on('click', function(e) {
		var clickX = e.pageX;
		var clickY = e.pageY;

		_.each(ballons, function(b, i) {
			if ((clickX < b.x + b.size && clickX > b.x - b.size) && (clickY < b.y + b.size && clickY > b.y - b.size)) {
				b.pop(i);
			}
		});
	});

	function init() {
		for (var i = 0; i < 20; i++) {
			ballons.push(new Ballon());
		}
		makeBallon();
	};

	function Ballon() {
		this.x = randomInt(65, (w-65));
		this.y = randomInt((h + 70), (h + 100));
		this.speed = Math.random() * 2;
		this.size = Math.random() * 60 + 5;
	
		this.pop = function (i) {
			ballons[i] = new Ballon();
		}
	};

	function makeBallon() {
		ctx.clearRect(0,0,w,h);
		_.each(ballons, function (b, i){
			
			var grd=ctx.createRadialGradient(b.size + b.x, b.size + b.y, b.size*3, b.size + b.x, b.size + b.y, b.size);
			grd.addColorStop(0,"rgba(91,174,252,0.7)");
			grd.addColorStop(.7,"rgba(207,231,254,0.5)");

			ctx.fillStyle = grd;
			ctx.shadowBlur = 20;
			ctx.shadowColor = "rgb(255,255,255)"
			ctx.beginPath();
			ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
			ctx.fill();

			if (b.y < 0 - b.size * 2) {
				ballons[i] = new Ballon;
			}
			b.y -= b.speed;
		});
		setTimeout(makeBallon, 20);
	};
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
