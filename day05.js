$(document).ready(function () {
	//creat the shape palette on the left 
	makeShapes();
	//drag html elements using Jquery UI 
	$('.block').draggable({
		containment: 'window',
		stack: '.block',
		snap: true,
		snapMode: 'outer',
		snapTolerance: 13,
	});
	// rotate image on click
	var angle = 0;
	$('.block').click(function () {
		angle +=90;
		$(this).css('transform','rotate('+ angle + 'deg)');
	});
	
	// instruction dispears on mousedown
	$('#toybox').on('mousedown', function () {
		$('#instruction').fadeOut('slow');
	})

	function makeShapes() {
		var shapes = ['tri', 'triequi',
                              'square','largesquare', 'trilarge']

		for (var i = 0; i < 5; i++) {
			var shape = shapes[i];
			makeShape(shape);
		}
	};
	// create 10 copies of each shape
	function makeShape(shape) {
		for (var i = 0; i < 20; i++){
			$('#toybox').append('<img class="block ' + shape + '"src ="' + shape + '.svg"/>');
		}		
	}; 
});