/*==================== UPDATE MAIN PAGE BUTTONS ====================*/

const weeklyButton = document.getElementById('monthly-button');

function updateMainPageButton(city) {
	weeklyButton.innerHTML = `<a href="../air-quality-forecast/air-quality-forecast.html?city=${city}">Air Quality</a>`;
}

function getHourlyRealtime(data) {
	const monthlyRealtime = document.getElementById('monthly-realtime');
	const hourlyCityName = document.querySelector('.hourly__city_name');

	// console.log(hourlyRealtime.innerText);

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
	monthlyRealtime.innerHTML = `As of ${hours}:${minutes} ${ampm} CET`;
	hourlyCityName.innerHTML = `- ${data.location.name}, ${data.location.country}`;
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

/*==================== GET WEATHER DATA FUNCTIONS ====================*/

function getMonthlyPage(data) {
	const daysTag = document.querySelector('.days'),
		currentDate = document.querySelector('.current-date'),
		prevNextIcon = document.querySelectorAll('.calendar__header i');
	let date = new Date(),
		currYear = date.getFullYear(),
		currMonth = date.getMonth();
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

	const renderCalendar = () => {
		let forecastDay = 0;
		let todayPassed = false;

		let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
			lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
			lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
			lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
		let liTag = '';
		for (let i = firstDayofMonth; i > 0; i--) {
			liTag += `<li class="inactive">
                    <p >${lastDateofLastMonth - i + 1}</p>
                <p class="inactive__i">--</p>

                    <p>--</p>
                  </li>`;
		}
		for (let i = 1; i <= lastDateofMonth; i++) {
			let isToday =
				i === date.getDate() &&
				currMonth === new Date().getMonth() &&
				currYear === new Date().getFullYear()
					? 'active'
					: '';
			liTag += `<li class="${isToday}">
                    <p class="day">${i}</p>
                    `;

			if ((isToday || todayPassed) && forecastDay < data.forecast.forecastday.length) {
				let dayTemp = Math.round(data.forecast.forecastday[forecastDay].day.avgtemp_c);
				const dailyIconUrl = data.forecast.forecastday[forecastDay].day.condition.icon;
				const dailyIconName = dailyIconUrl.split('/').pop();
				const dailyIcon = getIconClass(dailyIconName);
				liTag += `
                <i class="uil ${dailyIcon ? dailyIcon : iconsMapping['xxx.png']}"></i>
                <p class="forecast">${dayTemp}°</p>
                        `;
				forecastDay++;
				todayPassed = true;
			} else {
				liTag += `
                <p class="inactive__i">--</p>
                <p>--</p>`;
			}

			liTag += `</li>`;
		}
		for (let i = lastDayofMonth; i < 6; i++) {
			liTag += `<li class="inactive">
                    <p >${i - lastDayofMonth + 1}</p>
                <p class="inactive__i">--</p>

                    <p>--</p>
                  </li>`;
		}
		currentDate.innerText = `${months[currMonth]} ${currYear}`;
		daysTag.innerHTML = liTag;
		// console.log(liTag);
	};
	renderCalendar();
	prevNextIcon.forEach((icon) => {
		icon.addEventListener('click', () => {
			currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;
			if (currMonth < 0 || currMonth > 11) {
				date = new Date(currYear, currMonth, new Date().getDate());
				currYear = date.getFullYear();
				currMonth = date.getMonth();
			} else {
				date = new Date();
			}
			renderCalendar();
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

// Fetch Weather data based on city
function fetchWeatherData(city) {
	fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`
	)
		.then((response) => response.json())
		.then((data) => {
			updateNavbarLinks(city);
			getMonthlyPage(data);
			getHourlyRealtime(data);
			hideLoader();
			showMain();
			updateMainPageButton(city);
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

// const searchInputs = document.querySelectorAll('.search-input');
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
