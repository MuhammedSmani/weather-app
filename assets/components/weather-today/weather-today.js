fetch('../../components/weather-today/weather-today.html')
	.then(function (response) {
		return response.text();
	})
	.then(function (data) {
		window.onload = addCode();
		function addCode() {
			document.getElementById('weather-today').innerHTML = data;
		}
	})
	.catch(function (err) {
		console.warn('Something went wrong.', err);
	});
