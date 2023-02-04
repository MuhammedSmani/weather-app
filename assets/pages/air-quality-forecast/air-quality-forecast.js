/*==================== OPEN AND CLOSE MODAL ====================*/

const airQualityModal = document.querySelector('.air__quality__modal');
const triggerModal = document.querySelector('#air-quality-comments');
const closeModalButton = document.querySelector('.air__quality__close__btn');

function openModal(event) {
	airQualityModal.classList.add('show-modal');
	airQualityModal.classList.remove('close-modal');
}

function closeModal() {
	airQualityModal.classList.add('close-modal');
	airQualityModal.classList.remove('show-modal');
}

function windowOnScroll(event) {
	closeModal();
}

triggerModal.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('scroll', windowOnScroll);

// Get City and Country data
function getCityCountry(data) {
	const cityCountry = document.getElementById('city-country');
	cityCountry.innerHTML = `${data.location.name}, ${data.location.country}`;
}

/*==================== COLORS CONSTANTS ====================*/

const progressBars = document.querySelectorAll('div[role="progressbar"]');
var green =
	'radial-gradient(closest-side, white 82%, transparent 0 99.9%, white 0), conic-gradient(green calc(var(--pgPercentage) * 1%), #f2f2f2 0)';
var yellow =
	'radial-gradient(closest-side, white 82%, transparent 0 99.9%, white 0), conic-gradient(yellow calc(var(--pgPercentage) * 1%), #f2f2f2 0)';
var orange =
	'radial-gradient(closest-side, white 82%, transparent 0 99.9%, white 0), conic-gradient(orange calc(var(--pgPercentage) * 1%), #f2f2f2 0)';
var red =
	'radial-gradient(closest-side, white 82%, transparent 0 99.9%, white 0), conic-gradient(red calc(var(--pgPercentage) * 1%), #f2f2f2 0)';
var brown =
	'radial-gradient(closest-side, white 82%, transparent 0 99.9%, white 0), conic-gradient(brown calc(var(--pgPercentage) * 1%), #f2f2f2 0)';

/*==================== GET PM2.5 DATA FUNCTIONS ====================*/

// PM25 consts
const pm25Index = document.getElementById('pm25-index');
const pm25CategoryElements = document.querySelectorAll('.pm25-category');
const pm25CategoryText = document.getElementById('pm25-category-text');
const pm25IndexInt = document.querySelectorAll('.pm25-index-int');

// Function for showing the PM2.5 category depending on the PM2.5 index
function setPm25Category(pm25Num, pm25CategoryElement, pm25IndexInt, pm25CategoryText) {
	var pm25valuenow;
	if (pm25Num < 12.5) {
		pm25CategoryElement.innerHTML = `Good`;
		pm25CategoryText.innerHTML = `Air quality is considered satisfactory, and air pollution poses little or no risk.`;
		pm25valuenow = 1;
		progressBars[0].style.background = green;
		progressBars[1].style.background = green;
	} else if (pm25Num < 25) {
		pm25CategoryElement.innerHTML = `Fair`;
		pm25CategoryText.innerHTML = `Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.`;
		pm25valuenow = 2;
		progressBars[0].style.background = yellow;
		progressBars[1].style.background = yellow;
	} else if (pm25Num < 50) {
		pm25CategoryElement.innerHTML = `Poor`;
		pm25CategoryText.innerHTML = `Members of sensitive groups may experience health effects. The general public is not likely to be affected.`;
		pm25valuenow = 3;
		progressBars[0].style.background = orange;
		progressBars[1].style.background = orange;
	} else if (pm25Num < 150) {
		pm25CategoryElement.innerHTML = `Very poor`;
		pm25CategoryText.innerHTML = `Health warnings of emergency conditions. The entire population is more likely to be affected.`;
		pm25valuenow = 4;
		progressBars[0].style.background = red;
		progressBars[1].style.background = red;
	} else {
		pm25CategoryElement.innerHTML = `Extremely poor`;
		pm25CategoryText.innerHTML = `Health alert: everyone may experience more serious health effects.`;
		pm25valuenow = 5;
		progressBars[0].style.background = brown;
		progressBars[1].style.background = brown;
	}
	pm25IndexInt[0].style.setProperty('--value', pm25valuenow * 20);
	pm25IndexInt[1].style.setProperty('--value', pm25valuenow * 20);
	pm25IndexInt[0].innerHTML = pm25valuenow;
	pm25IndexInt[1].innerHTML = pm25valuenow;
}

// Show PM2.5 index, category, color
function getPm25Data(data) {
	pm25CategoryElements.forEach(function (pm25CategoryElement, index) {
		var pm25Num = Number(data.current.air_quality.pm2_5.toFixed(2));
		pm25Index.innerHTML = pm25Num;
		setPm25Category(pm25Num, pm25CategoryElement, pm25IndexInt, pm25CategoryText);
	});
}

/*==================== GET CO DATA FUNCTIONS ====================*/

// CO consts
const coIndex = document.getElementById('co-index');
const coCategory = document.getElementById('co-category');
const coIndexInt = document.getElementById('co-index-int');

// Function for showing the CO category depending on the CO index
function setCoCategory(coNum, coIndexInt, coCategory) {
	var covaluenow;
	var coBackground = progressBars[2].style.background;
	if (coNum < 30) {
		coCategory.innerHTML = `Good`;
		covaluenow = 1;
		coBackground = green;
	} else if (coNum < 70) {
		coCategory.innerHTML = `Poor`;
		covaluenow = 2;
		coBackground = orange;
	} else {
		coCategory.innerHTML = `Extremely poor`;
		covaluenow = 3;
		coBackground = brown;
	}
	coIndexInt.style.setProperty('--value', covaluenow * 33.33);
	coIndexInt.innerHTML = covaluenow;
	progressBars[2].style.background = coBackground;
}

// Show CO index, category, color
function getCoData(data) {
	var coNum = Number(data.current.air_quality.co.toFixed(2));
	coIndex.innerHTML = coNum;
	setCoCategory(coNum, coIndexInt, coCategory);
}

/*==================== GET NO2 DATA FUNCTIONS ====================*/

// NO2 consts
const no2Index = document.getElementById('no2-index');
const no2Category = document.getElementById('no2-category');
const no2IndexInt = document.getElementById('no2-index-int');

// Function for showing the NO2 category depending on the NO2 index
function setNo2Category(no2Num, no2IndexInt, no2Category) {
	var no3valuenow;
	var no2background = progressBars[3].style.background;
	if (no2Num < 60) {
		no2Category.innerHTML = `Good`;
		no3valuenow = 1;
		no2background = green;
	} else if (no2Num < 120) {
		no2Category.innerHTML = `Fair`;
		no3valuenow = 2;
		no2background = yellow;
	} else if (no2Num < 180) {
		no2Category.innerHTML = `Poor`;
		no3valuenow = 3;
		no2background = orange;
	} else if (no2Num < 360) {
		no2Category.innerHTML = `Very poor`;
		no3valuenow = 4;
		no2background = red;
	} else {
		no2Category.innerHTML = `Extremely poor`;
		no3valuenow = 5;
		no2background = brown;
	}
	no2IndexInt.style.setProperty('--value', no3valuenow * 20);
	no2IndexInt.innerHTML = no3valuenow;
	progressBars[3].style.background = no2background;
}

// Show NO2 index, category, color
function getNo2Data(data) {
	var no2Num = Number(data.current.air_quality.no2.toFixed(2));
	no2Index.innerHTML = no2Num;
	setNo2Category(no2Num, no2IndexInt, no2Category);
}

/*==================== GET O3 DATA FUNCTIONS ====================*/

// O3 consts
const o3Index = document.getElementById('o3-index');
const o3Category = document.getElementById('o3-category');
const o3IndexInt = document.getElementById('o3-index-int');

// Function for showing the O3 category depending on the O3 index
function setO3Category(o3Num, o3IndexInt, o3Category) {
	var o3valuenow;
	var o3background = progressBars[4].style.background;
	if (o3Num < 50) {
		o3Category.innerHTML = `Good`;
		o3valuenow = 1;
		o3background = green;
	} else if (o3Num < 100) {
		o3Category.innerHTML = `Moderate`;
		o3valuenow = 2;
		o3background = yellow;
	} else if (o3Num < 150) {
		o3Category.innerHTML = `Poor`;
		o3valuenow = 3;
		o3background = orange;
	} else if (o3Num < 300) {
		o3Category.innerHTML = `Very poor`;
		o3valuenow = 4;
		o3background = red;
	} else {
		o3Category.innerHTML = `Hazardous`;
		o3valuenow = 5;
		o3background = brown;
	}
	o3IndexInt.style.setProperty('--value', o3valuenow * 20);
	o3IndexInt.innerHTML = o3valuenow;
	progressBars[4].style.background = o3background;
}

// Show 03 index, category, color
function getO3Data(data) {
	var o3Num = Number(data.current.air_quality.o3.toFixed(2));
	o3Index.innerHTML = o3Num;
	setO3Category(o3Num, o3IndexInt, o3Category);
}

/*==================== GET PM10 DATA FUNCTIONS ====================*/

// PM10 consts
const pm10Index = document.getElementById('pm10-index');
const pm10Category = document.getElementById('pm10-category');
const pm10IndexInt = document.getElementById('pm10-index-int');

// Function for showing the PM10 category depending on the PM10 index
function setPm10Category(pm10Num, pm10IndexInt, pm10Category) {
	var pm10valuenow;
	var pm10background = progressBars[5].style.background;
	if (pm10Num < 40) {
		pm10Category.innerHTML = `Good`;
		pm10valuenow = 1;
		pm10background = green;
	} else if (pm10Num < 80) {
		pm10Category.innerHTML = `Fair`;
		pm10valuenow = 2;
		pm10background = yellow;
		pm10Category.innerHTML = `Poor`;
		pm10valuenow = 3;
		pm10background = orange;
		pm10Category.innerHTML = `Very poor`;
		pm10valuenow = 4;
		pm10background = red;
	} else {
		pm10Category.innerHTML = `Extremely poor`;
		pm10valuenow = 5;
		pm10background = brown;
	}
	pm10IndexInt.style.setProperty('--value', pm10valuenow * 20);
	pm10IndexInt.innerHTML = pm10valuenow;
	progressBars[5].style.background = pm10background;
}

// Show PM10 index, category, color
function getPm10Data(data) {
	var pm10Num = Number(data.current.air_quality.pm10.toFixed(2));
	pm10Index.innerHTML = pm10Num;
	setPm10Category(pm10Num, pm10IndexInt, pm10Category);
	// pm10IndexInt.innerHTML = parseInt(pm10Num);
}

/*==================== GET SO2 DATA FUNCTIONS ====================*/

// SO2 consts
const so2Index = document.getElementById('so2-index');
const so2Category = document.getElementById('so2-category');
const so2IndexInt = document.getElementById('so2-index-int');

// Function for showing the SO2 category depending on the SO2 index
function setSo2Category(so2Num, so2IndexInt, so2Category) {
	var so2valuenow;
	var so2background = progressBars[6].style.background;
	if (so2Num < 100) {
		so2Category.innerHTML = `Good`;
		so2valuenow = 1;
		so2background = green;
	} else if (so2Num < 200) {
		so2Category.innerHTML = `Fair`;
		so2valuenow = 2;
		so2background = yellow;
	} else if (so2Num < 300) {
		so2Category.innerHTML = `Poor`;
		so2valuenow = 3;
		so2background = orange;
	} else if (so2Num < 400) {
		so2Category.innerHTML = `Very poor`;
		so2valuenow = 4;
		so2background = red;
	} else {
		so2Category.innerHTML = `Extremely poor`;
		so2valuenow = 5;
		so2background = brown;
	}
	so2IndexInt.style.setProperty('--value', so2valuenow * 20);
	so2IndexInt.innerHTML = so2valuenow;
	progressBars[6].style.background = so2background;
}

// Show SO2 index, category, color
function getSo2Data(data) {
	const so2Num = Number(data.current.air_quality.so2.toFixed(2));
	so2Index.innerHTML = so2Num;
	setSo2Category(so2Num, so2IndexInt, so2Category);
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
			getCityCountry(data);
			getPm25Data(data);
			getCoData(data);
			getNo2Data(data);
			getO3Data(data);
			getPm10Data(data);
			getSo2Data(data);
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
			return `<li><a href="../../../assets/pages/air-quality-forecast/air-quality-forecast.html?city=${item}">${item}</a></li>`;
		})
		//Joining the HTML of all results into a single string
		.join('');

	searchResults.classList.add('search-show');
	searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}

hideMain();
showLoader();
