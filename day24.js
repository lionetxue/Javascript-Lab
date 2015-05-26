
$(document).ready(function () {
	var script = document.createElement('script');

	$('#loc_input').focus();

	$('form').one('submit', function (e) {
		e.preventDefault();
		$('#title').fadeOut(100);

		$('form').animate({top:'20px'}, 500);

		setTimeout(function () {
			$('#temp_container').fadeIn(200);
		}, 500)
	});

	$('form').on('submit', function (e) {
		e.preventDefault();

		var query = $.trim($('#loc_input').val().toString());

		if (query == '') {
			$('#location').text('');
			$('#temp').text('');
			$('#desc').text('Please refresh and enter your location.');
			$('body').css('background-color', '#f7f7f7');
		} else {
			script.src = 'http://api.worldweatheronline.com/free/v2/weather.ashx?q=' + query + '&format=json&callback=getData&num_of_days=1&key=733599452e995c8592745d251aa3d';
			script.id = 'api_call'
			document.body.appendChild(script);
		}	

		script = null;
		$('#api_call').remove();
		script = document.createElement('script');
	
	});
	
	$('#reset').click(function(){
        window.location.assign("day24.html");
    })
});

var getData = function (data) {
	if ('error' in data.data) {
		$('#location').text('');
		$('#temp').text('');
		$('#desc').text('Unable to find location.');
		$('body').css('background-color', '#f7f7f7');
	} else {
		var temp = data.data.current_condition[0].temp_F;
		$('#location').text(data.data.request[0].type +": " + data.data.request[0].query);
		$('#date').text(data.data.weather[0].date);
		$('#temp').text(temp);
		$('#max').text("LOW: "+data.data.weather[0].mintempF + "  HIGH:" +data.data.weather[0].maxtempF);
		$('#desc').text(data.data.current_condition[0].weatherDesc[0].value);
		$('#uvIndex').text("UV Index: " + data.data.weather[0].uvIndex);
		$('#windSpeed').text("Wind Speed: " +data.data.current_condition[0].windspeedMiles + " MPH");
		$('#chanceofrain').text("Chance of Rain: " + data.data.weather[0].hourly[0].chanceofrain +"%");
	}
};