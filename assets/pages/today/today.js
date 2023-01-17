// Update Today page link
function updateTodayPage(city) {
  const todayPages = document.querySelectorAll('.today-page');
  todayPages.forEach(todayPage => {
    todayPage.innerHTML = `<a href="../../../assets/pages/today/today.html?city=${city}" class="nav__link">Today</a>`;
  });
}

// Update Air Quality page link
function updateAirQualityPage(city) {
  const airQualityPages = document.querySelectorAll('.airquality-page');
  airQualityPages.forEach(airQualityPage => {
    airQualityPage.innerHTML = `<a href="../../../assets/pages/air-quality-forecast/air-quality-forecast.html?city=${city}" class="nav__link">Air Quality</a>`;
  });
}

// Update Hourly page link
function updateHourlyPage(city) {
  const hourlyPages = document.querySelectorAll('.hourly-page');
  hourlyPages.forEach(hourlyPage => {
    hourlyPage.innerHTML = `<a href="../../../assets/pages/hourly/hourly.html?city=${city}" class="nav__link">Hourly</a>`;
  });
}

// Update 7 Day page link
function updateSevenDayPage(city) {
  const sevenDayPages = document.querySelectorAll('.sevenday-page');
  sevenDayPages.forEach(sevenDayPage => {
    sevenDayPage.innerHTML = `<a href="../../../assets/pages/sevenday/sevenday.html?city=${city}" class="nav__link">7 Day</a>`;
  });
}

// Update Weekend page link
function updateWeekendPage(city) {
  const weekendPages = document.querySelectorAll('.weekend-page');
  weekendPages.forEach(weekendPage => {
    weekendPage.innerHTML = `<a href="../../../assets/pages/weekend/weekend.html?city=${city}" class="nav__link">Weekend</a>`;
  });
}

// Update Monthly page link
function updateMonthlyPage(city) {
  const monthlyPages = document.querySelectorAll('.monthly-page');
  monthlyPages.forEach(monthlyPage => {
    monthlyPage.innerHTML = `<a href="../../../assets/pages/monthly/monthly.html?city=${city}" class="nav__link">Monthly</a>`;
  });
}

// Update Radar page link
function radarPage(city) {
  const radarPages = document.querySelectorAll('.radar-page');
  radarPages.forEach(radarPage => {
    radarPage.innerHTML = `<a href="../../../assets/pages/radar/radar.html?city=${city}" class="nav__link">Radar</a>`;
  });
}

// Update Navbar links
function updateNavbarLinks(city) {
  updateTodayPage(city);
  updateAirQualityPage(city);
  updateHourlyPage(city);
  updateSevenDayPage(city);
  updateWeekendPage(city);
  updateMonthlyPage(city);
  radarPage(city);
}

// Daily Forecast section consts
const hourlyTime = document.querySelectorAll('.hourly-time');
const hourlyTemp = document.querySelectorAll('.hourly-temp');
const hourlyRain = document.querySelectorAll('.hourly-rain');

// Daily Forecast section consts


// Condition Text and Icons
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

// Fetch Weather data
function fetchWeatherData(city) {
  // check if localStorage has a cache entry for the city
  if (localStorage.getItem(`cache-${city}`)) {
    // read the cache entry
    const cacheData = JSON.parse(localStorage.getItem(`cache-${city}`));
    // check if the cache data is still valid (1 hour)
    const currentTime = new Date();
    const cacheTime = new Date(cacheData.cacheTime);
    const timeDiffInMs = currentTime - cacheTime;
    const timeDiffInHrs = timeDiffInMs / 3600000;
    if (timeDiffInHrs < 1) {
      // return the cached data
      return Promise.resolve(cacheData.data);
    } else {
      localStorage.removeItem(`cache-${city}`);
    }
  }
  return fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      // create a cache entry with the current time
      localStorage.setItem(`cache-${city}`, JSON.stringify({ data: data, cacheTime: new Date() }));
      return data;
    })
    .catch(error => {
      console.error(error);
    });
}

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

// Function to generate Today's Forecast section for each time period
function generateTodaysForecastHTML(period, temp, chanceOfRain) {
  return `<div class="todays__forecast_${period} todays__forecast_four-all">
              <p>${period[0].toUpperCase() + period.slice(1)}</p>
              <p id="${period}-temp">${temp}°</p>
              <span class="today-forecast-icon"><i class="uil uil-cloud-sun-rain-alt"></i></span>
              <div class="todays__forecast_rain">
                <span id="${period}-icon"><i class="uil uil-raindrops"></i></span>
                <p class="rain-chance">${chanceOfRain}%</p>
              </div>
            </div>`
}

// Get Today's Forecast section data
function getTodaysForecast(data) {
  // Get the parent div
  const todaysForecast = document.querySelector('.todays__forecast_four');
  
  // Array of time periods
  const timePeriods = ['morning', 'afternoon', 'evening', 'overnight'];
  
  // Iterate through the time periods and append the HTML to the parent div
  for (let i = 0; i < timePeriods.length; i++) {
    let period = timePeriods[i];
    let temp;
    let chanceOfRain;
    if(period === 'overnight'){
      temp = Math.round(data.forecast.forecastday[1].hour[0].temp_c);
      chanceOfRain = data.forecast.forecastday[1].hour[0].chance_of_rain;
    }
    else{
      temp = Math.round(data.forecast.forecastday[0].hour[i*6].temp_c);
      chanceOfRain = data.forecast.forecastday[0].hour[i*6].chance_of_rain;
    }
    todaysForecast.innerHTML += generateTodaysForecastHTML(period, temp, chanceOfRain);
  }
}

// Get Daily Forecast section data
function getDailyForecast(data) {
  const shortDailyName = document.querySelectorAll('.short-daily-name')
  const maxTempNext = document.querySelectorAll('.max-temp-next');
  const minTempNext = document.querySelectorAll('.min-temp-next');
  const dailyRainChance = document.querySelectorAll('.daily-rain');

  // Show the Max temperature for each tomorrow day
  maxTempNext[0].innerHTML = `${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`;
  maxTempNext[1].innerHTML = `${Math.round(data.forecast.forecastday[1].day.maxtemp_c)}°`;
  maxTempNext[2].innerHTML = `${Math.round(data.forecast.forecastday[2].day.maxtemp_c)}°`;
  maxTempNext[3].innerHTML = `${Math.round(data.forecast.forecastday[3].day.maxtemp_c)}°`;
  maxTempNext[4].innerHTML = `${Math.round(data.forecast.forecastday[4].day.maxtemp_c)}°`;

  // Show the Min temperature for each tomorrow day
  minTempNext[0].innerHTML = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
  minTempNext[1].innerHTML = `${Math.round(data.forecast.forecastday[1].day.mintemp_c)}°`;
  minTempNext[2].innerHTML = `${Math.round(data.forecast.forecastday[2].day.mintemp_c)}°`;
  minTempNext[3].innerHTML = `${Math.round(data.forecast.forecastday[3].day.mintemp_c)}°`;
  minTempNext[4].innerHTML = `${Math.round(data.forecast.forecastday[4].day.mintemp_c)}°`;

  // Show the Daily Rain Chance for each day (started from today)
  dailyRainChance[0].innerHTML = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
  dailyRainChance[1].innerHTML = `${data.forecast.forecastday[1].day.daily_chance_of_rain}%`;
  dailyRainChance[2].innerHTML = `${data.forecast.forecastday[2].day.daily_chance_of_rain}%`;
  dailyRainChance[3].innerHTML = `${data.forecast.forecastday[3].day.daily_chance_of_rain}%`;
  dailyRainChance[4].innerHTML = `${data.forecast.forecastday[4].day.daily_chance_of_rain}%`;

  // Show the Short Daily Name in the Daily Forecast Section
  const forecastdDaysData = data.forecast.forecastday;

  for (let i = 1; i < forecastdDaysData.length; i++) {
    const dateString = forecastdDaysData[i].date;
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const dayOfMonth = date.toLocaleString("en-US", { day: "numeric" });
    const formattedDate = dayOfWeek + " " + dayOfMonth;
    shortDailyName[i].innerHTML = formattedDate;
  }
}

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




// Get all Weather data by city input
function getWeatherData() {
  let city = new URLSearchParams(window.location.search).get('city');
  if (city == null) {
    city = "tirana";
  }

  fetchWeatherData(city)
  .then(data => {
    updateNavbarLinks(city);
    getCityCountry(data);
    getRealtimeTime(data);
    getRealtimeTemp(data);
    getConditionText(data)
    getConditionIcon(data);
    getDayNightTemp(data);
    getTodaysForecast(data);
    getWeatherToday(data);

    getDailyForecast(data)
  })
  .catch(error => {
    console.error(error);
  });
}

getWeatherData();