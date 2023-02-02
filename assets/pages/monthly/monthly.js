/*==================== GET WEATHER DATA FUNCTIONS ====================*/

function getMonthlyPage(data) {
	// const activeNum = document.querySelector('.active');
	// activeNum.innerHTML = `${Math.round(data.forecast.forecastday[0].day.avgtemp_c)}°`;
	// console.log(`${Math.round(data.forecast.forecastday[0].day.avgtemp_c)}`);

	console.log(data);

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
			liTag += `<li>
                    <p class="inactive">${lastDateofLastMonth - i + 1}</p>
                  </li>`;
		}
		for (let i = 1; i <= lastDateofMonth; i++) {
			// console.log(date.getDate(), new Date().getMonth(), new Date().getFullYear());
			let isToday =
				i === date.getDate() &&
				currMonth === new Date().getMonth() &&
				currYear === new Date().getFullYear()
					? 'active'
					: '';
			liTag += `<li class="${isToday}">
                    <p class="day">${i}</p>`;

			if ((isToday || todayPassed) && forecastDay < data.forecast.forecastday.length) {
				let dayTemp = Math.round(data.forecast.forecastday[forecastDay].day.avgtemp_c);
				liTag += `<p class="forecast">${dayTemp}</p>`;
				forecastDay++;
				todayPassed = true;
			}

			liTag += `</li>`;
		}
		for (let i = lastDayofMonth; i < 6; i++) {
			liTag += `<li>
                    <p class="inactive">${i - lastDayofMonth + 1}</p>
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
searchInputs[1].addEventListener('submit', getCityValue);

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
				searchInputs[1].value = city;
				localStorage.setItem('city', city);
				// Update the URL with the city value
				updateSearchParams(city);
				fetchWeatherData(city);
			});
	},
	(error) => {
		console.log(error);
	}
);

// Get the city name from the URL
const cityFromUrl = searchParams.get('city');
if (cityFromUrl) {
	searchInputs[0].value = cityFromUrl;
	searchInputs[1].value = cityFromUrl;
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
