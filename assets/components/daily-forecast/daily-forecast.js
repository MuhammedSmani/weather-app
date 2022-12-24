fetch('../../components/daily-forecast/daily-forecast.html')
	.then(function (response) {
		return response.text();
	})
	.then(function (data) {
		window.onload = addCode();
		function addCode() {
			document.getElementById('daily-forecast').innerHTML = data;
		}
	})
	.catch(function (err) {
		console.warn('Something went wrong.', err);
	});
