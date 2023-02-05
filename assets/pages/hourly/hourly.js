/*==================== UPDATE MAIN PAGE BUTTONS ====================*/

const hourlyButton = document.getElementById('hourly-button');

function updateMainPageButton(city) {
	hourlyButton.innerHTML = `<a href="../sevenday/sevenday.html?city=${city}">7 Day Weather</a>`;
}

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

function getHourlyRealtime(data) {
	const hourlyRealtime = document.getElementById('hourly-realtime');

	const timeString = data.location.localtime;
	const time = new Date(timeString);

	let hours = time.getHours();
	let minutes = time.getMinutes();
	let ampm = 'AM';

	if (hours > 12) {
		hours -= 12;
		ampm = 'PM';
	}

	minutes = minutes < 10 ? `0${minutes}` : minutes;
	hourlyRealtime.innerHTML = `As of ${hours}:${minutes} ${ampm} CET`;
}

function getHourlyPage(data) {
	const months = [
		'January',
		'February',
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
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	//

	const dateOne = new Date(`${data.forecast.forecastday[0].date}`);
	const dayNameOne = days[dateOne.getDay()];
	const monthNameOne = months[dateOne.getMonth()];
	const dateNumberOne = dateOne.getDate();

	hourlyFirstDay.innerHTML = `${dayNameOne}, ${monthNameOne} ${dateNumberOne}`;

	const dateTwo = new Date(`${data.forecast.forecastday[1].date}`);
	const dayNameTwo = days[dateTwo.getDay()];
	const monthNameTwo = months[dateTwo.getMonth()];
	const dateNumberTwo = dateTwo.getDate();

	hourlySecondDay.innerHTML = `${dayNameTwo}, ${monthNameTwo} ${dateNumberTwo}`;

	const dateThree = new Date(`${data.forecast.forecastday[2].date}`);
	const dayNameThree = days[dateThree.getDay()];
	const monthNameThree = months[dateThree.getMonth()];
	const dateNumberThree = dateThree.getDate();

	hourlyThirdDay.innerHTML = `${dayNameThree}, ${monthNameThree} ${dateNumberThree}`;

	hourlyCityName.innerHTML = `- ${data.location.name}, ${data.location.country}`;

	let currentHour = new Date().getHours();

	for (i = currentHour; i < 24; i++) {
		const time = new Date(`${data.forecast.forecastday[0].hour[i].time}`);
		const options = { hour: 'numeric', hour12: true };
		const timeString = time.toLocaleString('en-US', options);
		const hourlyIconUrl = data.forecast.forecastday[0].hour[i].condition.icon;
		const hourlyIconName = hourlyIconUrl.split('/').pop();
		const hourlyIcon = getIconClass(hourlyIconName);

		hourlyDescription.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(data.forecast.forecastday[0].hour[i].temp_c)}°</span>
									</div>
									<div class="condition">	<i class="uil ${hourlyIcon ? hourlyIcon : iconsMapping['xxx.png']}"></i>
									<span>${data.forecast.forecastday[0].hour[i].condition.text}</span></div>
									<div class="rain"><i class="uil uil-raindrops"> </i><span>${
										data.forecast.forecastday[0].hour[i].will_it_rain
									}%</span></div>
									<div class="wind"><i class="uil uil-wind"></i> <span>NW ${
										data.forecast.forecastday[0].hour[i].wind_kph
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
													><b>${Math.round(data.forecast.forecastday[0].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${data.forecast.forecastday[0].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${data.forecast.forecastday[0].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(data.forecast.forecastday[0].hour[i].uv)} of 10</b></span
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
													><b>${data.forecast.forecastday[0].hour[i].cloud}%</b></span
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
													><b>${data.forecast.forecastday[0].hour[i].precip_mm} mm</b></span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
          `;
	}

	for (i = 0; i < 24; i++) {
		const time = new Date(`${data.forecast.forecastday[0].hour[i].time}`);
		const options = { hour: 'numeric', hour12: true };
		const timeString = time.toLocaleString('en-US', options);
		const hourlyIconUrl1 = data.forecast.forecastday[1].hour[i].condition.icon;
		const hourlyIconName1 = hourlyIconUrl1.split('/').pop();
		const hourlyIcon1 = getIconClass(hourlyIconName1);
		hourlyDescriptionTwo.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(data.forecast.forecastday[1].hour[i].temp_c)}°</span>
									</div>
									<div class="condition"><i class="uil ${
										hourlyIcon1 ? hourlyIcon1 : iconsMapping['xxx.png']
									}"></i> <span>${
			data.forecast.forecastday[1].hour[i].condition.text
		}</span></div>
									<div class="rain"><i class="uil uil-raindrops"> </i><span>${
										data.forecast.forecastday[1].hour[i].will_it_rain
									}%</span></div>
									<div class="wind"><i class="uil uil-wind"></i> <span>NW ${
										data.forecast.forecastday[1].hour[i].wind_kph
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
													><b>${Math.round(data.forecast.forecastday[1].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${data.forecast.forecastday[1].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${data.forecast.forecastday[1].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(data.forecast.forecastday[1].hour[i].uv)} of 10</b></span
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
													><b>${data.forecast.forecastday[1].hour[i].cloud}%</b></span
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
													><b>${data.forecast.forecastday[1].hour[i].precip_mm}mm</b></span
												>
											</div>
										</li>
									</ul>
								</div>
							</div>
          `;
		const hourlyIconUrl2 = data.forecast.forecastday[2].hour[i].condition.icon;
		const hourlyIconName2 = hourlyIconUrl2.split('/').pop();
		const hourlyIcon2 = getIconClass(hourlyIconName2);
		hourlyDescriptionThree.innerHTML += `
          <div class="hourly__main">
									<div>
										<span>${timeString}</span>
									</div>
									<div>
										<span>${Math.round(data.forecast.forecastday[2].hour[i].temp_c)}°</span>
									</div>
									<div class="condition"><i class="uil ${
										hourlyIcon2 ? hourlyIcon2 : iconsMapping['xxx.png']
									}"></i> <span>${
			data.forecast.forecastday[2].hour[i].condition.text
		}</span></div>
									<div class="rain"><i class="uil uil-raindrops"> </i><span>${
										data.forecast.forecastday[2].hour[i].will_it_rain
									}%</span></div>
									<div class="wind"><i class="uil uil-wind"></i> <span>NW ${
										data.forecast.forecastday[2].hour[i].wind_kph
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
													><b>${Math.round(data.forecast.forecastday[2].hour[i].feelslike_c)}°</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-wind"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__wind">Wind</span>
												<span class="hourly__wind__temp"
													><b>NW ${data.forecast.forecastday[2].hour[i].wind_kph} kph</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-tear"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__humidity">Humidity</span>
												<span class="hourly__humidity__temp"
													><b>${data.forecast.forecastday[2].hour[i].humidity}%</b></span
												>
											</div>
										</li>
										<li>
											<i class="uil uil-sun"></i>
											<div class="hourly__hidden__info__text">
												<span class="hourly__uv__index">UV Index</span>
												<span class="hourly__uv__index__temp"
													><b>${Math.round(data.forecast.forecastday[2].hour[i].uv)} of 10</b></span
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
													><b>${data.forecast.forecastday[2].hour[i].cloud}%</b></span
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
													><b>${data.forecast.forecastday[2].hour[i].precip_mm} mm</b></span
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
}

/*==================== GET WEATHER DATA FUNCTIONS ====================*/

// Constants
const apiKey = '9ce000ab2ee94bf8bfd111052222012';
const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=10&aqi=yes&alerts=yes`;
const searchForm = document.querySelector('.search-form');
const searchInputs = document.querySelectorAll('.search-input');
const searchParams = new URLSearchParams(window.location.search);

searchInputs[0].addEventListener('submit', getCityValue);

// Get the city name value in search input
function getCityValue(event) {
	event.preventDefault();
	const city = event.target.value;
	updateSearchParams(city);
	fetchWeatherData(city);
}

// Update Search parameters
function updateSearchParams(city) {
	searchParams.set('city', city);
	window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
}

// Show Loader
const loader = document.querySelector('.sun__logo_wrapper');
function showLoader() {
	loader.style.display = 'flex';
}

const main = document.getElementById('main');

function showMain() {
	main.style.display = 'block';
}

function hideMain() {
	main.style.display = 'none';
}

// Hide loader
function hideLoader() {
	loader.style.display = 'none';
}

// Fetch Weather data based on city
function fetchWeatherData(city) {
	fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`
	)
		.then((response) => response.json())
		.then((data) => {
			updateNavbarLinks(city);
			updateMainPageButton(city);
			getHourlyRealtime(data);
			getHourlyPage(data);
			hideLoader();
			showMain();
		});
}

// Fetch Weather data based on the Geolocation
navigator.geolocation.getCurrentPosition(
	(position) => {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;

		// Fetch weather data based on current location
		fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`
		)
			.then((response) => response.json())
			.then((data) => {
				const city = data.location.name;
				if (
					localStorage.getItem('city') &&
					localStorage.getItem('city') === city &&
					window.location.search
				)
					return;
				// Set city name in input field
				searchInputs[0].value = city;
				localStorage.setItem('city', city);
				// Update the URL with the city value
				updateSearchParams(city);
				fetchWeatherData(city);
			});
	},
	(error) => {
		const cityFromUrl = searchParams.get('city');
		if (!cityFromUrl) {
			// If there is no city value in the URL, set the default city to 'Pristina'
			searchInputs[0].value = 'Pristina';
			updateSearchParams('Pristina');
			fetchWeatherData('Pristina');
		} else {
			console.error(error);
			// If geolocation is off and there is a city value in the URL, set the city name in the input field and update the URL with the city value
			searchInputs[0].value = cityFromUrl;
			updateSearchParams(cityFromUrl);
		}
	}
);

// Get the city name from the URL
const cityFromUrl = searchParams.get('city');
if (cityFromUrl) {
	searchInputs[0].value = cityFromUrl;
	fetchWeatherData(cityFromUrl);
}

/*==================== AUTOCOMPLETE SEARCH FORM ====================*/

// Declaring an array that contains a list of cities
let searchable = [
	'London',
	'Pristina',
	'Moscow',
	'Paris',
	'Berlin',
	'Berne',
	'Sofia',
	'Madrid',
	'Ljubljana',
	'Tirana',
	'Sarajevo',
	'Athens',
	'Rome',
	'Zagreb',
	'Stockholm',
	'Valletta',
	'Chisinau',
	'Skopje',
	'Luxembourg',
	'Vilnius',
	'Vaduz',
	'Riga',
	'Dublin',
	'Reykjavik',
	'Budapest',
	'Vatican City',
	'Helsinki',
	'Tallinn',
	'Copenhagen',
	'Prague',
	'Vienna',
	'Minsk',
	'Andorra La Vella',
	'Monaco',
	'Vilnius',
	'Podgorica',
	'Amsterdam',
	'Oslo',
	'Warsaw',
	'Lisbon',
	'Bucharest',
	'Belgrade',
	'San Marino',
	'Bratislava',
	'Prague',
	'Kiev',
];

const searchField = document.querySelector('.search');
const searchResults = document.querySelector('.search-results');

searchInputs.forEach((searchInput) => {
	searchInput.addEventListener('keyup', () => {
		// Initializing an empty array to store search results
		let results = [];
		// Storing the current value of the search input
		let resultInput = searchInput.value;
		// If the search input has a value
		if (resultInput.length) {
			// Filtering the 'searchable' array for items that include the current search input value
			results = searchable.filter((item) => {
				return item.toLowerCase().includes(resultInput.toLowerCase());
			});
			//If there's no match, clearing the search results
			if (!results.length) {
				searchResults.classList.remove('search-show');
				searchResults.innerHTML = '';
				return;
			}
		} else {
			searchResults.classList.remove('search-show');
			searchResults.innerHTML = '';
			return;
		}

		renderResults(results);
	});
});

//Function that renders the search results
function renderResults(results) {
	if (!results.length) {
		return searchResults.classList.remove('search-show');
	}
	//Mapping the filtered results to create the HTML for each result
	let searchContent = results
		.map((item) => {
			return `<li><a href="../../../assets/pages/hourly/hourly.html?city=${item}">${item}</a></li>`;
		})
		//Joining the HTML of all results into a single string
		.join('');

	searchResults.classList.add('search-show');
	searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}

hideMain();
showLoader();
