"use strict";

const hourlyButton = document.getElementById("weekend-button");

function updateMainPageButton(city) {
  hourlyButton.innerHTML = `<a href="../monthly/monthly.html?city=${city}">Monthly Weather</a>`;
}

function getWeekendData(data) {
  const currentWeekend = document.querySelector(".current-weekend");
  currentWeekend.innerHTML = "";
  const city = data.location.name + ", " + data.location.country;
  const searchName = document.querySelector("#search-name");
  searchName.innerHTML = city;
  const hourRealtime = document.querySelector("#hourly-realtime");
  const time = new Date().toLocaleTimeString();
  hourRealtime.innerHTML = "As of " + time;
  const filteredData = data.forecast.forecastday.filter((x) => {
    const dt = new Date(x.date);
    const day = dt.getUTCDay();
    const today = new Date().getUTCDay();
    return day === 5 || day === 6 || day === 0;
  });

  // Loop through the weekend data and generate the HTML
  const thisWeekend = filteredData.slice(0, 3);
  thisWeekend.forEach((day) => {
    const { date, day: dayData, hour } = day;
    const { maxtemp_c, mintemp_c, avgtemp_c, maxwind_kph, uv } = dayData;
    const { condition } = hour[0];
    const { text, icon } = condition;
    const humidities = [hour[0].humidity];
    // the data about uv, sunrise, sunset
    const sunrises = [day.astro.sunrise];
    const sunsets = [day.astro.sunset];
    const uv1 = [uv];

    const temperature = Math.round(avgtemp_c);
    const dailyIconUrl = day.day.condition.icon;
    const dailyIconName = dailyIconUrl.split("/").pop();
    const dailyIcon = getIconClass(dailyIconName);
    // Sat 30, Sun 31, Mon 1
    const dayName = new Date(date).toLocaleDateString("en-UK", {
      weekday: "short",
      day: "numeric",
    });
    const windSpeed = Math.round(maxwind_kph);
    const description = text;
    const weatherDiv = `
		<div class="summary">
		<div class="for-weekend">
		<div class="weekend-days">
		<h3>${dayName}</h3>
		<div class="grade">
              <span>${temperature}°</span>
              <span>/</span>
							<span>8°</span>
							</div>
							<div class="logo">
               <i class="uil ${
                 dailyIcon ? dailyIcon : iconsMapping["xxx.png"]
               }"></i>
              <span>${description}</span>
							</div>
							<div class="percentage">
              <i class="uil uil-raindrops"></i>
              <span>${humidities}%</span>
          </div>
          <div class="wind">
					<i class="uil uil-wind"></i>
              <span>${windSpeed} km/h</span>
							</div>
							<div class="arrow">
              <i class="uil uil-angle-down"></i>
							</div>
							</div>
							</div>
							<div class="dropdown hidden">
							<div class="dropdown-grade">
							<div class="daily-content">
							<div class="daily-temp">
							<span> ${dayName}</span>
							<span>|</span>
							<h2>${temperature}°</h2>
							<div class="logo">
							<i class="uil uil-cloud-sun-rain"></i>
							</div>
							</div>
              <div class="logo12">
              <i class="uil uil-wind"></i>
              <div class="logo-dropdown">
              <span>${windSpeed} km/h</span>
              <span>${description}</span>
                </div>
							</div>
          </div>

					<div class="dropdown-info">
					${humidities.map((humidity) => {
            return `<div class="humidity broder-bottom logo" id="logo">
            <i class="uil uil-tear"></i>
            <div class="index">
            <span>Humidity</span>
            <span>${humidity}%</span>
            </div>
            </div>`;
          })}
            ${uv1.map((uv) => {
              return `<div class="uv broder-bottom logo" id="logo">
              <i class="uil uil-sun"></i>
              <div class="index">
              <span>UV</span>
              <span>${uv}</span>
              </div>
              </div>`;
            })}
            ${sunrises.map((sunrise) => {
              return `<div class="sunrise broder-bottom logo" id="logo">
              <i class="uil uil-sun"></i>
              <div class="index">
              <span>Sunrise</span>
              <span>${sunrise}</span>
              </div>
              </div>`;
            })}
            ${sunsets.map((sunset) => {
              return `<div class="sunset logo" id="logo">
              <i class="uil uil-sunset"></i>
              <div class="index">
              <span>Sunset</span>
              <span>${sunset}</span>
              </div>
              </div>`;
            })}
          </div>
      </div>
      </div>
			</div>`;
    currentWeekend.innerHTML += weatherDiv;
  });
  // add event listener for dropdown
  const arrows = document.querySelectorAll(".arrow");
  // onclick
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      // find div with class dropdown
      arrow.parentElement.parentElement.parentElement
        .querySelector(".dropdown")
        .classList.toggle("hidden");
    });
  });
}

// Show Loader
// Show Loader
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

/*==================== GET WEATHER DATA FUNCTIONS ====================*/

// Constants
const apiKey = "9ce000ab2ee94bf8bfd111052222012";
const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=10&aqi=yes&alerts=yes`;
const searchForm = document.querySelector(".search-form");
const searchInputs = document.querySelectorAll(".search-input");
const searchParams = new URLSearchParams(window.location.search);

searchInputs[0].addEventListener("submit", getCityValue);

// Get the city name value in search input
function getCityValue(event) {
  event.preventDefault();
  const city = event.target.value;
  updateSearchParams(city);
  fetchWeatherData(city);
}

// Update Search parameters
function updateSearchParams(city) {
  searchParams.set("city", city);
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${searchParams.toString()}`
  );
}

// Fetch Weather data based on city
function fetchWeatherData(city) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      updateNavbarLinks(city);
      getWeekendData(data);
      updateMainPageButton(city);
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
          localStorage.getItem("city") &&
          localStorage.getItem("city") === city &&
          window.location.search
        )
          return;
        // Set city name in input field
        searchInputs[0].value = city;
        localStorage.setItem("city", city);
        // Update the URL with the city value
        updateSearchParams(city);
        fetchWeatherData(city);
      });
  },
  (error) => {
    const cityFromUrl = searchParams.get("city");
    if (!cityFromUrl) {
      // If there is no city value in the URL, set the default city to 'Pristina'
      searchInputs[0].value = "Pristina";
      updateSearchParams("Pristina");
      fetchWeatherData("Pristina");
    } else {
      console.error(error);
      // If geolocation is off and there is a city value in the URL, set the city name in the input field and update the URL with the city value
      searchInputs[0].value = cityFromUrl;
      updateSearchParams(cityFromUrl);
    }
  }
);

// Get the city name from the URL
const cityFromUrl = searchParams.get("city");
if (cityFromUrl) {
  searchInputs[0].value = cityFromUrl;
  // searchInputs[1].value = cityFromUrl;
  fetchWeatherData(cityFromUrl);
}

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
      return `<li><a href="../../../assets/pages/weekend/weekend.html?city=${item}">${item}</a></li>`;
    })
    //Joining the HTML of all results into a single string
    .join("");

  searchResults.classList.add("search-show");
  searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}

hideMain();
showLoader();
