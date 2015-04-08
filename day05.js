$(document).ready(function () {
	//create the shape palette on the left 
	makeShapes();
	
/*	// Create a clone of the shape on mousedown
	$('.block').mouseover (function () {
		var myLink = $(this).attr('src');
		myLink = myLink.replace("images/", "");
		myLink = myLink.replace(".svg", "");
		makeShape(myLink);
	});  */
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
	$('#toybox').mousedown (function () {
		$('#instruction').fadeOut('slow');
	});

	function makeShapes() {
		var shapes = ['tri', 'triequi',
                              'square','largesquare', 'trilarge']

		for (var i = 0; i < 5; i++) {
			var shape = shapes[i];
			makeShape(shape);
		}
	};
	
	//Make 20 copies of each shape
	function makeShape(shape) {
		for (i=0; i<20; i++) {
			$('#toybox').append('<img class="block ' + shape + '"src ="images/' + shape + '.svg"/>');
		
		}	
	}; 
});