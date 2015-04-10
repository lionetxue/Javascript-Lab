 (function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery); 

$(document).ready(function () {
	var canvas = $('canvas')[0],
	    ctx = canvas.getContext('2d'),
	    h = window.innerHeight-150,
	    w = window.innerWidth,
	    flakes = [],
	    snow_depth = h - 5;

	canvas.height = h;
	canvas.width = w;
	
	setInterval(paintScreen, 30);

	$('button').on('click', function () {
		for (var i = 0; i < 100; i++) {
			makeSnowFlake(randomInt(0, w), -1 * randomInt(15, 500));
		}
	});

	function paintScreen() {
		ctx.clearRect(0,0,w,h);
		drawSnow();
		drawGround();
	}

	function Drop(x, y) {
		this.x = x;
		this.y = y;
		this.speed = 3;
		this.radius = 5;
	};

	function makeSnowFlake(x, y) {
		flakes.push(new Drop(x, y));
	};

	function drawSnow() {
		_.each(flakes, function (drop, i) {
			//define a gradient
			var my_gradient = ctx.createRadialGradient(drop.x,drop.y,0, drop.x, drop.y, drop.radius);
			my_gradient.addColorStop(0, "white");
			my_gradient.addColorStop(1,"#3A5894");
			//draw circles with gradient 
			ctx.fillStyle = my_gradient;
			ctx.beginPath();
			//convert from degrees to radians: Math.PI = 180 deg 
			ctx.arc(drop.x, drop.y, drop.radius, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();

			evolveDrop(drop, i)
		});
	}

	function evolveDrop(drop, i) {
		drop.y += drop.speed;

		if (drop.y > snow_depth + drop.radius * 2) {
			flakes.splice(i, 1);
			snow_depth -= 0.25;
		}
	};  

	function drawGround() {
		if (snow_depth > 40) {
			ctx.fillStyle = 'white';
			ctx.fillRect(0, snow_depth, w, h);
		} else {
			snow_depth = 40;
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 40, w, h);
			$('button').off().css({
				'background-color': '#E5D7B5',
				'cursor': 'auto'
			});
		}
	};

	$('body').disableSelection(); 
	
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
