// const hourlyArrows = document.querySelectorAll('.hourly-arrow');
// const hourlyHidden = document.querySelectorAll('.hourly__hidden');

const hourlyDate = document.querySelector('.hourly__date');
const hourlyFirstDay = document.querySelector('.hourly__first_day');
const hourlySecondDay = document.querySelector('.hourly__second_day');
const hourlyThirdDay = document.querySelector('.hourly__third_day');
const hourlyDescription = document.querySelector('.hourly__description');
const hourlyDescriptionTwo = document.querySelector('.hourly__description_two');
const hourlyDescriptionThree = document.querySelector('.hourly__description_three');
const hourlyCityName = document.querySelector('.hourly__city_name');

// Icons
var lightRainIcon = `<i class="uil uil-cloud-rain"></i>`;
var mistIcon = `<i class="uil uil-clouds"></i>`;
var overcastIcon = `<i class="uil uil-cloud"></i>`;
var moderateRainIcon = `<i class="uil uil-cloud-rain"></i>`;
var partlyCloudyIcon = `<i class="uil uil-cloud-sun"></i>`;
var clearIcon = `<i class="uil uil-sun"></i>`;
var fogIcon = `<i class="uil uil-clouds"></i>`;
var cloudyIcon = `<i class="uil uil-clouds"></i>`;
var patchyRainIcon = `<i class="uil uil-cloud-sun-rain-alt"></i>`;
var lightDrizzleIcon = `<i class="uil uil-cloud-showers-heavy"></i>`;
var lightRainShowerIcon = `<i class="uil uil-cloud-sun-tear"></i>`;
var heavySnowIcon = `<i class="uil uil-cloud-sun-hail"></i>`;
var moderateHeavySnowIcon = `<i class="uil uil-cloud-sun-hail"></i>`;
var patchyLightSnowIcon = `<i class="uil uil-cloud-sun-meatball"></i>`;
var otherIcon = `<i class="uil uil-rainbow"></i>`;

// console.log(hourlyDescription);

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// hourlyArrows.forEach((arrow, index) => {
// 	arrow.addEventListener('click', () => {
// 		if (hourlyHidden[index].style.display === 'block') {
// 			hourlyHidden[index].style.display = 'none';
// 		} else {
// 			hourlyHidden.forEach((hidden) => {
// 				hidden.style.display = 'none';
// 			});
// 			hourlyHidden[index].style.display = 'block';
// 		}
// 	});
// });

// form.addEventListener('submit', (event) => {
// 	event.preventDefault();
// 	const searchKeyword = searchInput.value;

window.onload = render();

function render() {
	fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=Pristina&days=10&aqi=yes&alerts=yes`
	)
		.then((response) => response.json())
		.then((data) => {
			// Show the city name on every section of the Home Page

			let response = data;

			const months = [
				'January',
				'Februaru',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			];
			const days = [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			];

			//

			const dateOne = new Date(`${response.forecast.forecastday[0].date}`);
			const dayNameOne = days[dateOne.getDay()];
			const monthNameOne = months[dateOne.getMonth()];
			const dateNumberOne = dateOne.getDate();

			hourlyFirstDay.innerHTML = `${dayNameOne}, ${monthNameOne} ${dateNumberOne}`;

			const dateTwo = new Date(`${response.forecast.forecastday[1].date}`);
			const dayNameTwo = days[dateTwo.getDay()];
			const monthNameTwo = months[dateTwo.getMonth()];
			const dateNumberTwo = dateTwo.getDate();

			hourlySecondDay.innerHTML = `${dayNameTwo}, ${monthNameTwo} ${dateNumberTwo}`;

			const dateThree = new Date(`${response.forecast.forecastday[2].date}`);
			const dayNameThree = days[dateThree.getDay()];
			const monthNameThree = months[dateThree.getMonth()];
			const dateNumberThree = dateThree.getDate();

			hourlyThirdDay.innerHTML = `${dayNameThree}, ${monthNameThree} ${dateNumberThree}`;

			//

			//

			hourlyCityName.innerHTML = `- ${response.location.name}`;

			let currentHour = new Date().getHours();
			// console.log(currentHour);

			for (i = currentHour; i < 24; i++) {
				const time = new Date(`${response.forecast.forecastday[0].hour[i].time}`);
				const options = { hour: 'numeric', hour12: true };
				const timeString = time.toLocaleString('en-US', options);

				hourlyDescription.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(response.forecast.forecastday[0].hour[i].temp_c)}°</span>
									</div>
									<div><i class="uil uil-cloud"></i> <span>${
										response.forecast.forecastday[0].hour[i].condition.text
									}</span></div>
									<div><i class="uil uil-raindrops"> </i><span>${
										response.forecast.forecastday[0].hour[i].will_it_rain
									}%</span></div>
									<div><i class="uil uil-wind"></i> <span>NW ${
										response.forecast.forecastday[0].hour[i].wind_kph
									} kph</span></div>
									<div class="hourly-arrow">
										<i class="uil uil-angle-down"></i>
									</div>
								</div>
								<div class="hourly__hidden">
									<ul class="hourly__hidden__info">
										<li>
											<i class="uil uil-thermometer"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__feels__like">Feels like</span>
												<span class="hourly__feels__like__temp"
													><b>${Math.round(response.forecast.forecastday[0].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${response.forecast.forecastday[0].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${response.forecast.forecastday[0].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(response.forecast.forecastday[0].hour[i].uv)} of 10</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-cloud"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__cloud__cover"
													>Cloud Cover</span
												>
												<span class="hourly__cloud__cover__temp"
													><b>${response.forecast.forecastday[0].hour[i].cloud}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-raindrops-alt"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__rain__amount"
													>Rain Amount</span
												>
												<span class="hourly__rain__amount__temp"
													><b>${response.forecast.forecastday[0].hour[i].chance_of_rain} mm</b></span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
          `;

				// var conditionText = document.querySelector('.condition-text');

				// var conditionIcon = document.querySelector('.condition');

				// var lightRainIcon = `<i class="uil uil-cloud-rain"></i>`;
				// var mistIcon = `<i class="uil uil-clouds"></i>`;
				// var overcastIcon = `<i class="uil uil-cloud"></i>`;
				// var moderateRainIcon = `<i class="uil uil-cloud-rain"></i>`;
				// var partlyCloudyIcon = `<i class="uil uil-cloud-sun"></i>`;
				// var clearIcon = `<i class="uil uil-sun"></i>`;
				// var fogIcon = `<i class="uil uil-clouds"></i>`;
				// var cloudyIcon = `<i class="uil uil-clouds"></i>`;
				// var patchyRainIcon = `<i class="uil uil-cloud-sun-rain-alt"></i>`;
				// var lightDrizzleIcon = `<i class="uil uil-cloud-showers-heavy"></i>`;
				// var lightRainShowerIcon = `<i class="uil uil-cloud-sun-tear"></i>`;
				// var heavySnowIcon = `<i class="uil uil-cloud-sun-hail"></i>`;
				// var moderateHeavySnowIcon = `<i class="uil uil-cloud-sun-hail"></i>`;
				// var patchyLightSnowIcon = `<i class="uil uil-cloud-sun-meatball"></i>`;
				// var otherIcon = `<i class="uil uil-rainbow"></i>`;

				// // if ((conditionText = 'Cloudy')) {
				// // 	document.querySelector('.condition').innerHTML = mistIcon;
				// // }

				// document.querySelector('.condition').forEach((el) => {
				// 	if (conditionText == 'Light rain') {
				// 		document.querySelector('.condition').innerHTML = lightRainIcon;
				// 	} else if (conditionText == 'Mist') {
				// 		document.querySelector('.condition').innerHTML = mistIcon;
				// 	} else if (conditionText == 'Overcast') {
				// 		document.querySelector('.condition').innerHTML = overcastIcon;
				// 	} else if (conditionText == 'Moderate rain') {
				// 		document.querySelector('.condition').innerHTML = moderateRainIcon;
				// 	} else if (conditionText == 'Partly cloudy') {
				// 		document.querySelector('.condition').innerHTML = partlyCloudyIcon;
				// 	} else if (conditionText == 'Clear') {
				// 		document.querySelector('.condition').innerHTML = clearIcon;
				// 	} else if (conditionText == 'Fog') {
				// 		document.querySelector('.condition').innerHTML = fogIcon;
				// 	} else if (conditionText == 'Cloudy') {
				// 		document.querySelector('.condition').innerHTML = cloudyIcon;
				// 	} else if (conditionText == 'Patchy rain possible') {
				// 		document.querySelector('.condition').innerHTML = patchyRainIcon;
				// 	} else if (conditionText == 'Light drizzle') {
				// 		document.querySelector('.condition').innerHTML = lightDrizzleIcon;
				// 	} else if (conditionText == 'Light rain shower') {
				// 		document.querySelector('.condition').innerHTML = lightRainShowerIcon;
				// 	} else if (conditionText == 'Heavy snow') {
				// 		document.querySelector('.condition').innerHTML = heavySnowIcon;
				// 	} else if (conditionText == 'Moderate or heavy snow showers') {
				// 		document.querySelector('.condition').innerHTML = moderateHeavySnowIcon;
				// 	} else if (conditionText == 'Patchy light snow') {
				// 		document.querySelector('.condition').innerHTML = patchyLightSnowIcon;
				// 	} else {
				// 		document.querySelector('.condition').innerHTML = otherIcon;
				// 	}
				// });
			}

			for (i = 0; i < 24; i++) {
				const time = new Date(`${response.forecast.forecastday[0].hour[i].time}`);
				const options = { hour: 'numeric', hour12: true };
				const timeString = time.toLocaleString('en-US', options);
				hourlyDescriptionTwo.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(response.forecast.forecastday[1].hour[i].temp_c)}°</span>
									</div>
									<div><i class="uil uil-cloud"></i> <span>${
										response.forecast.forecastday[1].hour[i].condition.text
									}</span></div>
									<div><i class="uil uil-raindrops"> </i><span>${
										response.forecast.forecastday[1].hour[i].will_it_rain
									}%</span></div>
									<div><i class="uil uil-wind"></i> <span>NW ${
										response.forecast.forecastday[1].hour[i].wind_kph
									} kph</span></div>
									<div class="hourly-arrow">
										<i class="uil uil-angle-down"></i>
									</div>
								</div>
								<div class="hourly__hidden">
									<ul class="hourly__hidden__info">
										<li>
											<i class="uil uil-thermometer"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__feels__like">Feels like</span>
												<span class="hourly__feels__like__temp"
													><b>${Math.round(response.forecast.forecastday[1].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${response.forecast.forecastday[1].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${response.forecast.forecastday[1].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(response.forecast.forecastday[1].hour[i].uv)} of 10</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-cloud"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__cloud__cover"
													>Cloud Cover</span
												>
												<span class="hourly__cloud__cover__temp"
													><b>${response.forecast.forecastday[1].hour[i].cloud}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-raindrops-alt"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__rain__amount"
													>Rain Amount</span
												>
												<span class="hourly__rain__amount__temp"
													><b>${response.forecast.forecastday[1].hour[i].chance_of_rain} mm</b></span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
          `;
				hourlyDescriptionThree.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(response.forecast.forecastday[2].hour[i].temp_c)}°</span>
									</div>
									<div><i class="uil uil-cloud"></i> <span>${
										response.forecast.forecastday[2].hour[i].condition.text
									}</span></div>
									<div><i class="uil uil-raindrops"> </i><span>${
										response.forecast.forecastday[2].hour[i].will_it_rain
									}%</span></div>
									<div><i class="uil uil-wind"></i> <span>NW ${
										response.forecast.forecastday[2].hour[i].wind_kph
									} kph</span></div>
									<div class="hourly-arrow">
										<i class="uil uil-angle-down"></i>
									</div>
								</div>
								<div class="hourly__hidden">
									<ul class="hourly__hidden__info">
										<li>
											<i class="uil uil-thermometer"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__feels__like">Feels like</span>
												<span class="hourly__feels__like__temp"
													><b>${Math.round(response.forecast.forecastday[2].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${response.forecast.forecastday[2].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${response.forecast.forecastday[2].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(response.forecast.forecastday[2].hour[i].uv)} of 10</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-cloud"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__cloud__cover"
													>Cloud Cover</span
												>
												<span class="hourly__cloud__cover__temp"
													><b>${response.forecast.forecastday[2].hour[i].cloud}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-raindrops-alt"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__rain__amount"
													>Rain Amount</span
												>
												<span class="hourly__rain__amount__temp"
													><b>${response.forecast.forecastday[2].hour[i].chance_of_rain} mm</b></span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
          `;
			}
			const hourlyArrows = document.querySelectorAll('.hourly-arrow');
			const hourlyHidden = document.querySelectorAll('.hourly__hidden');
			// console.log(hourlyArrows);

			hourlyArrows.forEach((arrow, index) => {
				arrow.addEventListener('click', () => {
					if (hourlyHidden[index].style.display === 'block') {
						hourlyHidden[index].style.display = 'none';
					} else {
						hourlyHidden.forEach((hidden) => {
							hidden.style.display = 'none';
						});
						hourlyHidden[index].style.display = 'block';
					}
				});
			});
		});
}

// function openHourly() {
// 	hourlyHidden.style.display == 'hidden';
// }
