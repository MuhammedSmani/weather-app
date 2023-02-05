/*==================== NEWS CONSTANTS ====================*/

const weatherTopTitle = document.getElementById("weather-top-title");
const weatherTopAuthor = document.getElementById("weather-top-author");
const weatherTopSource = document.getElementById("weather-top-source");
const weatherTopDate = document.getElementById("weather-top-date");
const weatherTopImage = document.getElementById("weather-top-image");
const weatherTopDescription = document.getElementById("weather-top-description");
const weatherTopContent = document.getElementById("weather-top-content");
const readMoreButton = document.querySelector(".weather__news__button");
const readMoreAnchor = document.querySelector("#weather-top-url");
let weatherNewsUrl;

/*==================== FETCH WEATHER NEWS DATA ====================*/

function fetchWeatherNews() {
  // check if localStorage has a cache entry for the news
  if (localStorage.getItem(`cache-weather-news`)) {
    // read the cache entry
    const cacheData = JSON.parse(localStorage.getItem(`cache-weather-news`));
    // check if the cache data is still valid (1 hour)
    const currentTime = new Date();
    const cacheTime = new Date(cacheData.cacheTime);
    const timeDiff = (currentTime - cacheTime) / 3600000;
    if (timeDiff < 1) {
      // return the cached data
      return Promise.resolve(cacheData.data);
    }
  }
  // fetch the data from the API
  return fetch(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=297bf25a8f8a457d89a37392b0db687a`
  )
    .then((response) => response.json())
    .then((data) => {
      // create a cache entry with the current time
      localStorage.setItem(
        `cache-weather-news`,
        JSON.stringify({ data: data, cacheTime: new Date() })
      );
      return data;
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
// searchInputs[1].addEventListener('submit', getCityValue);

// Get the city name value in search input
async function getCityValue(event) {
	event.preventDefault();
	const city = event.target.value;
	updateSearchParams(city);
	await fetchWeatherData(city);
}

// Update Search parameters
function updateSearchParams(city) {
	searchParams.set('city', city);
	window.history.pushState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
}

// Fetch Weather data based on city
async function fetchWeatherData(city) {
	const response = await fetch(
		`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`
	);
	const data = await response.json();
	updateNavbarLinks(city);
}

// Fetch Weather data based on the Geolocation
navigator.geolocation.getCurrentPosition(
	async (position) => {
		let lat = position.coords.latitude;
		let lng = position.coords.longitude;
		let data;
		// Fetch weather data based on current location
		try {
			const response = await fetch(
				`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`
			);
			data = await response.json();
		} catch (error) {
			console.error(error);
		}
		const city = data.location.name;
		if (
			localStorage.getItem('city') &&
			localStorage.getItem('city') === city &&
			window.location.search
		)
			return;

		// Set city name in input field
		searchInputs[0].value = city;
		// searchInputs[1].value = city;
		localStorage.setItem('city', city);

		// Update the URL with the city value
		updateSearchParams(city);
		fetchWeatherData(city);
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
	// searchInputs[1].value = cityFromUrl;
	fetchWeatherData(cityFromUrl);
}

/*==================== GET WEATHER TOP STORY ====================*/

function getWeatherTopStory(data) {
  const {
    title,
    author,
    source: { name },
    description,
    content,
  } = data.articles[0];
  weatherTopTitle.innerHTML = title;
  weatherTopAuthor.innerHTML = author;
  weatherTopSource.innerHTML = name;
  weatherTopDescription.innerHTML = description;

  const cleanedContent = content.replace(/\[\+\d+ chars\]/, "");
  weatherTopContent.innerHTML = cleanedContent;
}

// Get Weather Top Story date
function getWeatherTopStoryDate(data) {
  let weatherDateString = data.articles[0].publishedAt;

  // Create a date object from the weatherDateString
  let weatherDate = new Date(weatherDateString);

  // Extract the day, month, and year from the date object
  let day = weatherDate.getDate();
  let month = weatherDate.getMonth() + 1;
  let year = weatherDate.getFullYear();

  // Show the desired date format
  weatherTopDate.innerHTML = `${day}-${month}-${year}`;
}

// Get Weather Top Story image
function getWeatherTopStoryImage(data) {
  const imageUrl = data.articles[0].urlToImage;
  weatherTopImage.src = imageUrl;
}

// Update the href attribute of the anchor element
function openWeatherUrl(data) {
  readMoreAnchor.href = weatherNewsUrl;
  weatherNewsUrl = data.articles[0].url;
}

readMoreButton.addEventListener("click", openWeatherUrl);

/*==================== GET WEATHER NEWS ASIDE ====================*/

function getWeatherNewsAside(data) {
  const weatherNewsCards = document.querySelector(
    ".weather__news__aside__cards"
  );

  data.articles.slice(1, 5).forEach((article) => {
    const imageAsideUrl = article.urlToImage;
    const titleAside = article.title;
    const urlAside = article.url;
    const weatherNewsCard = `
      <div class="weather__news__aside__card">
        <a href="${urlAside}" target="_blank">
        <div class="image__wrapper">
          <img class="weather-news-image" src="${imageAsideUrl}" alt="">
        </div>
        <h4 class="weather-news-title">${titleAside}</h4>
        </a>
      </div>
    `;
    weatherNewsCards.insertAdjacentHTML("beforeend", weatherNewsCard);
  });
}



/*==================== GET WEATHER NEWS FUNCTION ====================*/

function getWeatherNews() {
  try {
    fetchWeatherNews().then((data) => {
      getWeatherTopStory(data);
      getWeatherTopStoryDate(data);
      getWeatherTopStoryImage(data);
      openWeatherUrl(data);
      getWeatherNewsAside(data);
      hideLoader();
      showMain();
    });
  } catch (error) {
    console.log("Error Occured: ", error);
  }
}

getWeatherNews();

/*==================== AUTOCOMPLETE SEARCH FORM ====================*/

// Declaring an array that contains a list of cities
let searchable = [
  "London",
  "Pristina",
  "Moscow",
  "Paris",
  "Berlin",
  "Berne",
  "Sofia",
  "Madrid",
  "Ljubljana",
  "Tirana",
  "Sarajevo",
  "Athens",
  "Rome",
  "Zagreb",
  "Stockholm",
  "Valletta",
  "Chisinau",
  "Skopje",
  "Luxembourg",
  "Vilnius",
  "Vaduz",
  "Riga",
  "Dublin",
  "Reykjavik",
  "Budapest",
  "Vatican City",
  "Helsinki",
  "Tallinn",
  "Copenhagen",
  "Prague",
  "Vienna",
  "Minsk",
  "Andorra La Vella",
  "Monaco",
  "Vilnius",
  "Podgorica",
  "Amsterdam",
  "Oslo",
  "Warsaw",
  "Lisbon",
  "Bucharest",
  "Belgrade",
  "San Marino",
  "Bratislava",
  "Prague",
  "Kiev",
];

// const searchInputs = document.querySelectorAll('.search-input');
const searchField = document.querySelector(".search");
// const searchInputs = document.querySelectorAll(".search-input");
const searchResults = document.querySelector(".search-results");

searchInputs.forEach((searchInput) => {
  searchInput.addEventListener("keyup", () => {
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
        searchResults.classList.remove("search-show");
        searchResults.innerHTML = "";
        return;
      }
    } else {
      searchResults.classList.remove("search-show");
      searchResults.innerHTML = "";
      return;
    }

    renderResults(results);
  });
});

//Function that renders the search results
function renderResults(results) {
  if (!results.length) {
    return searchResults.classList.remove("search-show");
  }
  //Mapping the filtered results to create the HTML for each result
  let searchContent = results
    .map((item) => {
      return `<li><a href="../../../assets/pages/today/today.html?city=${item}">${item}</a></li>`;
    })
    //Joining the HTML of all results into a single string
    .join("");

  searchResults.classList.add("search-show");
  searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}

/*==================== SHOW AND HIDE LOADER ====================*/

// Show loader
const loader = document.querySelector(".sun__logo_wrapper");
function showLoader() {
  loader.style.display = "flex";
}

const main = document.getElementById("main");

function showMain() {
  main.style.display = "block";
}

function hideMain() {
  main.style.display = "none";
}

// Hide loader
function hideLoader() {
  loader.style.display = "none";
}

hideMain();
showLoader();
