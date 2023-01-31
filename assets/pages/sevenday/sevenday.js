// const weeklyDescription = document.getElementById('weekly-main');
const weeklyDescription = document.querySelector(".weekly__description");

const weeklyTitle = document.querySelector(".weekly__title");

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

weeklyDescription.innerHTML = "";

function showData(data) {
  data.forecast.forecastday.forEach((day, index) => {
    weeklyDescription.innerHTML += `  <div class="weekly__main" id="weekly-${index}" >
    <div>
        <span>${day.date}</span>
    </div>
    <div>
        <span><b>${Math.round(
          day.day.maxtemp_c
        )}°</b></span><span>/${Math.round(day.day.mintemp_c)}°</span>
    </div>
    <div>
        <i class="uil uil-cloud"></i> <span>${day.day.condition.text}</span>
    </div>
    <div>
        <i class="uil uil-raindrops"> </i><span>64%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW 5 km/h</span>
    </div>
    <div class="weekly-arrow" data-index=${index}>
    <i class="uil uil-angle-down"></i>
  </div>
  </div>
  <div class="weekly__hidden" id="hidden-${index}">
  <div class="day-hidden"> 
  <div>
    <h1> <b>${day.date}</b><span>|Day</span></h1>
    <h1><b>${Math.round(day.day.maxtemp_c)}°</b></h1>
    <p>${day.day.condition.text}</p>
    <div>
        <i class=" uil uil-raindrops"></i> <span>${
          day.day.daily_chance_of_rain
        }%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW ${day.day.maxwind_kph} km/h</span>
    </div>
  </div>
  <ul class="weekly__hidden__info">
  <li>
  <i class="uil uil-tear"></i>
  <div class="weekly__hidden__info__text">
      <span class="weekly__humidity">Humidity</span>
      <span class="weekly__humidity__temp"><b>${day.day.avghumidity}%</b></span>
  </div>
</li>
 
  
    <li>
        <i class="uil uil-sun"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__uv__index">UV Index</span>
            <span class="weekly__uv__index__temp"><b>${
              day.day.uv
            } of 10</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-cloud"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__moonrise">Moonrise</span>
            <span class="weekly__moonrise__data"><b>${
              day.day.cloud
            }AM</b></span>
        </div>
    </li>
    <li>
    <i class="uil uil-cloud"></i>
    <div class="weekly__hidden__info__text">
        <span class="weekly__moonset">Moonset</span>
        <span class="weekly__moonset__data"><b>${day.day.cloud}AM</b></span>
    </div>
</li>  </ul>
  </div>
  <div class="night-hidden"> 
  <div>
    <h1> <b>${day.date}</b><span>|Night</span></h1>
    <h1><b>${Math.round(day.day.maxtemp_c)}°</b></h1>
    <p>${day.day.condition.text}</p>
    <div>
        <i class=" uil uil-raindrops"></i> <span>${
          day.day.daily_chance_of_rain
        }%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW ${day.day.maxwind_kph} km/h</span>
    </div>
  </div>
  <ul class="weekly__hidden__info">
  <li>
  <i class="uil uil-tear"></i>
  <div class="weekly__hidden__info__text">
      <span class="weekly__humidity">Humidity</span>
      <span class="weekly__humidity__temp"><b>${day.day.avghumidity}%</b></span>
  </div>
</li>
 
  
    <li>
        <i class="uil uil-sun"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__uv__index">UV Index</span>
            <span class="weekly__uv__index__temp"><b>${
              day.day.uv
            } of 10</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-cloud"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__moonrise">Moonrise</span>
            <span class="weekly__moonrise__data"><b>${
              day.day.cloud
            }AM</b></span>
        </div>
    </li>
    <li>
    <i class="uil uil-cloud"></i>
    <div class="weekly__hidden__info__text">
        <span class="weekly__moonset">Moonset</span>
        <span class="weekly__moonset__data"><b>${day.day.cloud}AM</b></span>
    </div>
</li>
  </ul>
  </div>
  </div>`;
  });
  const weeklyArrows = document.querySelectorAll(".weekly-arrow");
  const weeklyHidden = document.querySelectorAll(".weekly__hidden");

  weeklyArrows.forEach((arrow, index) => {
    arrow.addEventListener("click", () => {
      if (weeklyHidden[index].style.display === "flex") {
        weeklyHidden[index].style.display = "none";
      } else {
        weeklyHidden.forEach((hidden) => {
          hidden.style.display = "none";
        });
        weeklyHidden[index].style.display = "flex";
      }
    });
  });
}

/*==================== GET WEATHER DATA FUNCTIONS ====================*/

// Constants
const apiKey = "9ce000ab2ee94bf8bfd111052222012";
const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=10&aqi=yes&alerts=yes`;
const searchForm = document.querySelector(".search-form");
const searchInputs = document.querySelectorAll(".search-input");
const searchParams = new URLSearchParams(window.location.search);

searchInputs[0].addEventListener("submit", getCityValue);
searchInputs[1].addEventListener("submit", getCityValue);

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
      showTitleData(data);
      showData(data);
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
        searchInputs[1].value = city;
        localStorage.setItem("city", city);
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
const cityFromUrl = searchParams.get("city");
if (cityFromUrl) {
  searchInputs[0].value = cityFromUrl;
  searchInputs[1].value = cityFromUrl;
  fetchWeatherData(cityFromUrl);
}

function showTitleData(data){
  
  weeklyTitle.innerHTML += `
  <h1>7 Day Weather - <span id="city">${data.location.name}</span></h1>
  <p>As of <span id="current-time">Date(timeString).:44 pm</span>  CET</p>
  `

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
      return `<li><a href="../../../assets/pages/sevenday/sevenday.html?city=${item}">${item}</a></li>`;
    })
    //Joining the HTML of all results into a single string
    .join("");

  searchResults.classList.add("search-show");
  searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}