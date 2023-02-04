// // Show Loader
// const loader = document.querySelector('.sun__logo_wrapper');
// function showLoader() {
// 	loader.style.display = 'flex';
// }

// const main = document.getElementById('main');

// function showMain() {
// 	main.style.display = 'block';
// }

// function hideMain() {
// 	main.style.display = 'none';
// }

// // Hide loader
// function hideLoader() {
// 	loader.style.display = 'none';
// }

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const mapIcons = document.getElementById('mapicons');
const tempIcons = document.getElementById('tempicons');

var map = L.map('map');
let cities = [
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

let customIcon;
let marker;
let markers = [];

L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
	attribution:
		'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
}).addTo(map);

// Constants


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
				getRadarData(city);

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



const apiKey = '9ce000ab2ee94bf8bfd111052222012';
const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=10&aqi=yes&alerts=yes`;
const searchForm = document.querySelector('.search-form');
const searchInputs = document.querySelectorAll('.search-input');
const searchParams = new URLSearchParams(window.location.search);

searchInputs[0].addEventListener('submit', getCityValue);


function updateSearchParams(city) {
	searchParams.set('city', city);
	window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
}

// Get the city name value in search input

function getCityValue(event) {
	event.preventDefault();
	const city = event.target.value;
	updateSearchParams(city);
	getRadarData(city);
}


// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const searchKeyword = searchInput.value;

//     getRadarData(searchKeyword)

// });


{
	/* <h1 class="temperature"><b>${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°C</b> */
}

function getRadarData(city) {
	while (markers.length) {
		let marker = markers.pop();
		map.removeLayer(marker);
	}
	fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`
	)
		.then((response) => response.json())
		.then((data) => {
			updateNavbarLinks(city);
			showDataOnMap(data);
		});
}

function showDataOnMap(data) {
	const apilat = data.location.lat;
	const apilng = data.location.lon;
	let output = '';
	output += `
        <h2>${data.location.name}</h2>
        <h1 class="temperature"><b>${Math.round(data.current.temp_c)}°C</b>
        <h2>${data.current.condition.text}</h2>
        <h2>Feels like ${Math.round(data.current.feelslike_c)}°C</h2>
         <img src="${data.current.condition.icon}">
    `;

	customIcon = L.icon({
		iconUrl: `https://images.squarespace-cdn.com/content/v1/5ddbecf4e7b0381e7563300c/1614442398525-CBYTHYX9P22FT9NW0BUH/pin.png`,
		iconSize: [60, 60],
		// iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
	});

	marker = L.marker([apilat, apilng], { icon: customIcon }).addTo(map);
	marker.bindPopup(output).openPopup();
	map.setView([apilat, apilng], 10);
	markers.push(marker);
}

mapIcons.addEventListener('click', (event) => {
	event.preventDefault();
	getMapIcons();
	map.setView([48.15, 17.02], 5);
	// mapIconsInfo.style.display = 'flex';
	tempIconsInfo.style.display = 'none';
});

function getMapIcons() {
	while (markers.length) {
		let marker = markers.pop();
		map.removeLayer(marker);
	}
	cities.forEach(function (city) {

		fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10`
		)
			.then((response) => response.json())
			.then((data) => {
				const dailyIconUrl = data.current.condition.icon;
				const dailyIconName = dailyIconUrl.split('/').pop();
				const dailyIcon = getIconClass(dailyIconName);
				if (data.location.name === city) {
					var lat = data.location.lat;
					var lng = data.location.lon;

					customIcon = L.divIcon({
						className: 'map-icons',
						html: `<i class="uil ${dailyIcon ? dailyIcon : iconsMapping['xxx.png']}"></i>`,
						iconSize: [45, 45]
					});
					var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
					marker.bindPopup(
						`<h2>${city}<span class="temperature"><b>  ${Math.round(
							data.current.temp_c
						)}°C</b></span><span></h2><h2>Feels like ${data.current.feelslike_c}°</h2></span>`
					);
					markers.push(marker);
				}
			});
	});
}

const tempIconsInfo = document.querySelector('.temp-icons-content');
const mapIconsInfo = document.querySelector('.map-icons-content');

tempIcons.addEventListener('click', (event) => {
	event.preventDefault();
	getTempIcons();
	map.setView([48.15, 17.02], 5);
	tempIconsInfo.style.display = 'grid';
});

function getTempIcons() {
	while (markers.length) {
		let marker = markers.pop();
		map.removeLayer(marker);
	}
	cities.forEach(function (city) {
		fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10`
		)
			.then((response) => response.json())
			.then((dataa) => {
				if (dataa.location.name === city) {
					if (dataa.current.temp_c <= 0) {
						getLowTemp(dataa);
					} else if (dataa.current.temp_c > 0 && dataa.current.temp_c < 25) {
						getMediumTemp(dataa);
					} else {
						getHighTemp(dataa);
					}
				}
			})
			.catch(function (error) {
				console.log('Request failed', error);
			});
	});
}

function getHighTemp(data) {
	var lat = data.location.lat;
	var lng = data.location.lon;
	let highTempIcon = L.divIcon({
		className: 'high-temp-icon',
		html: '<i class="uil uil-temperature"></i>',
		iconSize: [45, 45],
	});

	var marker = L.marker([lat, lng], { icon: highTempIcon }).addTo(map);
	marker.bindPopup(
		`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(
			data.current.temp_c
		)}°C</b></span></h2>`
	);
	markers.push(marker);
}

function getMediumTemp(data) {
	var lat = data.location.lat;
	var lng = data.location.lon;
	let mediumTempIcon = L.divIcon({
		className: 'medium-temp-icon',
		html: '<i class="uil uil-temperature-half"></i>',
		iconSize: [45, 45],
	});

	var marker = L.marker([lat, lng], { icon: mediumTempIcon }).addTo(map);
	marker.bindPopup(
		`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(
			data.current.temp_c
		)}°C</b></span></h2>`
	);
	markers.push(marker);
}

function getLowTemp(data) {
	var lat = data.location.lat;
	var lng = data.location.lon;
	let lowTempIcon = L.divIcon({
		className: 'low-temp-icon',
		html: '<i class="uil uil-temperature-empty"></i>',
		iconSize: [45, 45],
	});
	var marker = L.marker([lat, lng], { icon: lowTempIcon }).addTo(map);
	marker.bindPopup(
		`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(
			data.current.temp_c
		)}°C</b></span></h2>`
	);
	markers.push(marker);
}

// Get the city name from the URL
const cityFromUrl = searchParams.get('city');
if (cityFromUrl) {
	searchInputs[0].value = cityFromUrl;
	getRadarData(cityFromUrl);
}


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
			// Filtering the 'cities' array for items that include the current search input value
			results = cities.filter((item) => {
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
			return `<li><a href="../../../assets/pages/radar/radar.html?city=${item}">${item}</a></li>`;
		})
		//Joining the HTML of all results into a single string
		.join('');

	searchResults.classList.add('search-show');
	searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}
