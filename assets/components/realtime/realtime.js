fetch('../../components/realtime/realtime.html')
	.then(function (response) {
		return response.text();
	})
	.then(function (data) {
		window.onload = addCode();
		function addCode() {
			document.getElementById('realtime').innerHTML = data;
		}
	})
	.catch(function (err) {
		console.warn('Something went wrong.', err);
	});
