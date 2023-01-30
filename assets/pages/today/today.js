/*==================== UPDATE MAIN PAGE BUTTONS ====================*/

function updateMainPageButtons(city) {
  const buttons = [
    {selector: '.todays__forecast_button', text: 'Next Hours', href: '../../../assets/pages/hourly/hourly.html'},
    {selector: '.hourly__forecast_button', text: 'Next 48 Hours', href: '../../../assets/pages/hourly/hourly.html'},
    {selector: '.daily__forecast_button', text: 'Next 7 Day', href: '../../../assets/pages/sevenday/sevenday.html'},
  ];

  buttons.forEach(button => {
    const el = document.querySelector(button.selector);
    el.innerHTML = `<a href="${button.href}?city=${city}">${button.text}</a>`;
  });
}

/*==================== ICONS AND TEXT ====================*/

const conditionText = document.getElementById('condition-text');
const conditionIcon = document.querySelectorAll('.condition-icon');
const icons = {
  "Light rain": `<i class="uil uil-cloud-rain"></i>`,
  "Sunny": `<i class="uil uil-brightness"></i>`,
  "Mist": `<i class="uil uil-clouds"></i>`,
  "Overcast": `<i class="uil uil-cloud"></i>`,
  "Moderate rain": `<i class="uil uil-cloud-rain"></i>`,
  "Partly cloudy": `<i class="uil uil-cloud-sun"></i>`,
  "Clear": `<i class="uil uil-moon"></i>`,
  "Fog": `<i class="uil uil-cloud-wind"></i>`,
  "Cloudy": `<i class="uil uil-clouds"></i>`,
  "Patchy rain possible": `<i class="uil uil-cloud-sun-rain-alt"></i>`,
  "Light drizzle": `<i class="uil uil-cloud-showers-heavy"></i>`,
  "Light rain shower": `<i class="uil uil-cloud-sun-tear"></i>`,
  "Heavy snow": `<i class="uil uil-cloud-meatball"></i>`,
  "Moderate or heavy snow showers": `<i class="uil uil-cloud-sun-hail"></i>`,
  "Patchy light snow": `<i class="uil uil-cloud-sun-meatball"></i>`,
  "Other": `<i class="uil uil-rainbow"></i>`
};

// Function for showing the Icons depending on the Text
function setConditionIcon(conditionTextData, iconElement) {
  const icon = icons[conditionTextData] || icons.Other;
  iconElement.innerHTML = icon;
}

/*==================== REALTIME SECTION ====================*/

// Get City and Country data
function getCityCountry(data) {
  const cityCountry = document.querySelectorAll('.city-country');
  cityCountry.forEach(node => {
      node.innerHTML = `${data.location.name}, ${data.location.country}`;
  });
}

// Get Realtime Time data
function getRealtimeTime(data) {
  const realtimeTime = document.getElementById('realtime-time');

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
  realtimeTime.innerHTML = `As of ${hours}:${minutes} ${ampm} CET`;
}

// Get Realtime Temperature data
function getRealtimeTemp(data) {
  const realtimeTemp = document.getElementById('realtime-temp');
  const currentTemp = data.current.temp_c;
  realtimeTemp.innerHTML = `${Math.round(currentTemp)}°`;
}

// Get Realtime Condition Text data
function getConditionText(data) {
  conditionText.innerHTML = data.current.condition.text;
}

// Get Realtime Condition Icon data
function getConditionIcon(data) {
  const conditionTextData = data.current.condition.text;
  conditionIcon.forEach((iconElement) => {
    setConditionIcon(conditionTextData, iconElement);
  });
}

// Get Realtime Day and Night Temperature data
function getDayNightTemp(data) {
  const dayTemp = document.getElementById('day-temp');
  const nightTemp = document.getElementById('night-temp');

  dayTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].hour[12].temp_c)}°`;
  nightTemp.innerHTML = `${Math.round(data.forecast.forecastday[1].hour[0].temp_c)}°`;
}

/*==================== ICONS MAPPING ====================*/

const iconsMapping = {
  "113.png": "uil-sun",
  "116.png": "uil-cloud-sun",
  "119.png": "uil-clouds",
  "122.png": "uil-cloud",
  "143.png": "uil-windy",
  "176.png": "uil-cloud-sun-rain-alt",
  "311.png": "uil-cloud-showers-heavy",
  "326.png": "uil-cloud-meatball",
  "329.png": "uil-cloud-sun-meatball",
  "332.png": "uil-cloud-meatball",
  "335.png": "uil-cloud-sun-meatball",
  "338.png": "uil-cloud-meatball",
  "371.png": "uil-cloud-sun-meatball",
  "xxx.png": "uil-rainbow",
};

function getIconClass(iconName) {
  return iconsMapping[iconName];
}

/*==================== TODAY'S FORECAST SECTION ====================*/

// Function to generate Today's Forecast section for each period
function generateTodaysForecastHTML(period, temp, chanceOfRain, todayIcon) {
  return `<div class="todays__forecast_${period} todays__forecast_four-all">
              <p>${period[0].toUpperCase() + period.slice(1)}</p>
              <p id="${period}-temp">${temp}°</p>
              <span class="today-forecast-icon">
                <i class="uil ${todayIcon ? todayIcon : iconsMapping["xxx.png"]}"></i>
              </span>
              <div class="todays__forecast_rain">
                <span id="${period}-icon"><i class="uil uil-raindrops"></i></span>
                <p class="rain-chance">${chanceOfRain}%</p>
              </div>
            </div>`
}

// Creating an object to store the time period indices
const timePeriods = {
  morning: 6,
  afternoon: 12,
  evening: 18,
  overnight: 0
}

// Get Today's Forecast section data
function getTodaysForecast(data) {
  const todaysForecast = document.querySelector('.todays__forecast_four');

  // Clear the previous data before appending new data
  todaysForecast.innerHTML = "";

  // Iterate through the time periods and append the HTML to the parent div
  for (let period in timePeriods) {
    let temp;
    let chanceOfRain;
    let todayIcon;
    switch (period) {
      case 'overnight':
        temp = Math.round(data.forecast.forecastday[1].hour[timePeriods[period]].temp_c);
        chanceOfRain = data.forecast.forecastday[1].hour[timePeriods[period]].chance_of_rain;
        var todayIconUrl = data.forecast.forecastday[1].hour[timePeriods[period]].condition.icon;
        var todayIconName = todayIconUrl.split("/").pop();
        todayIcon = getIconClass(todayIconName);
        break;
      default:
        temp = Math.round(data.forecast.forecastday[0].hour[timePeriods[period]].temp_c);
        chanceOfRain = data.forecast.forecastday[0].hour[timePeriods[period]].chance_of_rain;
        var todayIconUrl = data.forecast.forecastday[0].hour[timePeriods[period]].condition.icon;
        var todayIconName = todayIconUrl.split("/").pop();
        todayIcon = getIconClass(todayIconName);
        break;
    }
    todaysForecast.innerHTML += generateTodaysForecastHTML(period, temp, chanceOfRain, todayIcon);
  }
}

/*==================== WEATHER TODAY SECTION ====================*/

// Get Weather Today section data
function getWeatherToday(data) {
  const feelsLike = document.getElementById('feels-like');
  const maxTemp = document.getElementById('max-temp');
  const minTemp = document.getElementById('min-temp');
  const humidity = document.getElementById('humidity');
  const pressure = document.getElementById('pressure');
  const visibility = document.getElementById('visibility');
  const wind = document.getElementById('wind');
  const dewpoint = document.getElementById('dewpoint');
  const uvIndex = document.getElementById('uv-index');
  const moonPhase = document.getElementById('moon-phase');

  feelsLike.innerHTML = `${Math.round(data.current.feelslike_c)}°`;
  maxTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`;
  minTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
  humidity.innerHTML = `${data.current.humidity}%`;
  pressure.innerHTML = data.current.pressure_in;
  visibility.innerHTML = data.current.vis_km;
  wind.innerHTML = data.current.wind_kph;
  dewpoint.innerHTML = `${data.forecast.forecastday[0].hour[1].dewpoint_c}°`;
  uvIndex.innerHTML = data.current.uv;
  moonPhase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;
}

/*==================== HOURLY FORECAST SECTION ====================*/

// Function to generate Hourly Forecast section for each hour
function generateHourlyForecastHTML(hourlyTime, hourlyTemp, hourlyRainChance, hourlyIcon) {
  return `<div class="hourly__forecast_five-all">
            <p class="hourly-time">${hourlyTime}</p>
            <p class="hourly-temp">${hourlyTemp}°</p>
            <i class="uil ${hourlyIcon ? hourlyIcon : iconsMapping["xxx.png"]}"></i>
            <div class="hourly__forecast_rain">
              <i class="uil uil-raindrops"></i>
              <p class="hourly-rain">${hourlyRainChance}%</p>
            </div>
          </div>`
  }
  
// Get Hourly Forecast section data
function getHourlyForecast(data) {
  const hourlyForecast = document.querySelector('.hourly__forecast_five')
  hourlyForecast.innerHTML = "";
  
  const forecastHoursData = data.forecast.forecastday[2].hour;
  
  const numOfHours = 5;
  const currentHour = new Date().getHours();
  
  for (let i = 0; i < numOfHours && i < forecastHoursData.length; i++) {
    let hourlyTime = forecastHoursData[currentHour + i].time;
    const hourlyTemp = Math.round(forecastHoursData[currentHour + i].temp_c);
    const hourlyRainChance = forecastHoursData[currentHour + i].chance_of_rain;
    const hourlyIconUrl = forecastHoursData[currentHour + i].condition.icon;
    const hourlyIconName = hourlyIconUrl.split("/").pop();
    const hourlyIcon = getIconClass(hourlyIconName);
    if (i === 0) {
      hourlyTime = 'Now';
    } else {
      let hour = (currentHour + i) % 24;
      let period = 'am';
      
      if (hour === 0) {
        hour = 12;
      } else if (hour >= 12) {
        period = 'pm';
        if (hour > 12) {
          hour -= 12;
        }
      }
      hourlyTime = `${hour} ${period}`;
    }
    const html = generateHourlyForecastHTML(hourlyTime, hourlyTemp, hourlyRainChance, hourlyIcon);
    hourlyForecast.innerHTML += html;
  }
}

/*==================== DAILY FORECAST SECTION ====================*/

function generateDailyForecastHTML(shortDailyName, maxTemp, minTemp, dailyRainChance, dailyIcon) {
  return `<div class="daily__forecast_five-all">
            <p class="short-daily-name">${shortDailyName}</p>
            <p class="max-temp-next">${maxTemp}°</p>
            <p class="min-temp-next">${minTemp}°</p>
            <i class="uil ${dailyIcon ? dailyIcon : iconsMapping["xxx.png"]}"></i>
            <div class="daily__forecast_rain">
              <i class="uil uil-raindrops"></i>
              <p class="daily-rain">${dailyRainChance}%</p>
            </div>
          </div>`
}

function getDailyForecast(data) {
  const dailyForecast = document.querySelector('.daily__forecast_five');
  dailyForecast.innerHTML = "";
  
  const forecastdDaysData = data.forecast.forecastday;

  const numOfDays = 5;
  
  for (let i = 0; i < numOfDays && i < forecastdDaysData.length; i++) {
    let shortDailyName;
    if (i === 0) {
      shortDailyName = 'Today';
    } else {
      const dateString = forecastdDaysData[i].date;
      const date = new Date(dateString);
      const day = date.getDate();
      shortDailyName = date.toLocaleString("en-US", { weekday: "short" }) + " " + day;
    }

    const maxTemp = Math.round(forecastdDaysData[i].day.maxtemp_c);
    const minTemp = Math.round(forecastdDaysData[i].day.mintemp_c);
    const dailyRainChance = forecastdDaysData[i].day.daily_chance_of_rain;

    const dailyIconUrl = forecastdDaysData[i].day.condition.icon;
    const dailyIconName = dailyIconUrl.split("/").pop();
    const dailyIcon = getIconClass(dailyIconName);
  
    dailyForecast.innerHTML += generateDailyForecastHTML(shortDailyName, maxTemp, minTemp, dailyRainChance, dailyIcon);
  }
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
  updateSearchParams(city)
  fetchWeatherData(city);
}

// Update Search parameters
function updateSearchParams(city) {
  searchParams.set('city', city);
  window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
}

// Fetch Weather data based on city
async function fetchWeatherData(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`);
  const data = await response.json();
  
  updateNavbarLinks(city);
  updateMainPageButtons(city)
  getCityCountry(data);
  getRealtimeTime(data);
  getRealtimeTemp(data);
  getConditionText(data);
  getConditionIcon(data);
  getDayNightTemp(data);
  getTodaysForecast(data);
  getWeatherToday(data);
  getHourlyForecast(data);
  getDailyForecast(data);
}

// Fetch Weather data based on the Geolocation
async function getLocationData() {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    // Fetch weather data based on current location
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`);
    const data = await response.json();

    const city = data.location.name;
    if (localStorage.getItem('city') && localStorage.getItem('city') === city && window.location.search) return;

    // Set city name in input field
    searchInputs[0].value = city;
    searchInputs[1].value = city;
    localStorage.setItem('city', city);
    // Update the URL with the city value
    updateSearchParams(city);
    fetchWeatherData(city);
  } catch (error) {
    console.log(error);
  }
}

// Get the city name from the URL
const cityFromUrl = searchParams.get('city');
if (cityFromUrl) {
  searchInputs[0].value = cityFromUrl;
  searchInputs[1].value = cityFromUrl;
  fetchWeatherData(cityFromUrl);
}

getLocationData();

/*==================== AUTOCOMPLETE SEARCH FORM ====================*/

// Declaring an array that contains a list of cities
let searchable = ["London", "Pristina", "Moscow", "Paris", "Berlin", "Berne", "Sofia", "Madrid", "Ljubljana", "Tirana", "Sarajevo", "Athens", "Rome", "Zagreb", "Stockholm",
"Valletta", "Chisinau", "Skopje", "Luxembourg", "Vilnius", "Vaduz", "Riga", "Dublin", "Reykjavik", "Budapest", "Vatican City", "Helsinki", "Tallinn", "Copenhagen", "Prague",
"Vienna", "Minsk", "Andorra La Vella", "Monaco", "Vilnius", "Podgorica", "Amsterdam", "Oslo", "Warsaw", "Lisbon", "Bucharest", "Belgrade", "San Marino", "Bratislava", "Prague", "Kiev"];

// const searchInputs = document.querySelectorAll('.search-input');
const searchField = document.querySelector('.search')
const searchResults = document.querySelector('.search-results');

searchInputs.forEach(searchInput => {
searchInput.addEventListener('keyup', () => {
  // Initializing an empty array to store search results
  let results = [];
  // Storing the current value of the search input
  let resultInput = searchInput.value;
  // If the search input has a value
  if (resultInput.length) {
    // Filtering the 'searchable' array for items that include the current search input value
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(resultInput.toLowerCase())
    });
    //If there's no match, clearing the search results
    if(!results.length) {
      searchResults.classList.remove('search-show');
      searchResults.innerHTML = "";
      return;
    }
  } else {
    searchResults.classList.remove('search-show');
    searchResults.innerHTML = "";
    return;
  }
  
  renderResults(results);
});
});

//Function that renders the search results
function renderResults(results) {
  if(!results.length) {
    return searchResults.classList.remove('search-show');
  }
  //Mapping the filtered results to create the HTML for each result
  let searchContent = results.map((item) => {
    return `<li><a href="../../../assets/pages/today/today.html?city=${item}">${item}</a></li>`
  })
  //Joining the HTML of all results into a single string
  .join('');
  
  searchResults.classList.add('search-show')
  searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}