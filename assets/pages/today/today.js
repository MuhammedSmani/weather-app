// Form submit consts
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Realtime section consts
const cityCountry = document.querySelectorAll('.city-country');
const realtimeTime = document.getElementById('realtime-time');
const realtimeTemp = document.getElementById('realtime-temp');
const conditionText = document.getElementById('condition-text');
const conditionIcon = document.querySelectorAll('.condition-icon');
const dayTemp = document.getElementById('day-temp');
const nightTemp = document.getElementById('night-temp');

// Today's Forecast section consts
const morningTemp = document.getElementById('morning-temp');
const afternoonTemp = document.getElementById('afternoon-temp');
const eveningTemp = document.getElementById('evening-temp');
const overnightTemp = document.getElementById('overnight-temp');
const todayForecastIcon = document.querySelectorAll('.today-forecast-icon')
const rainChance = document.querySelectorAll('.rain-chance')

// Weather Today section consts
const feelsLike = document.getElementById('feels-like');
const maxTemp = document.querySelectorAll('.max-temp');
const minTemp = document.querySelectorAll('.min-temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const wind = document.getElementById('wind');
const dewpoint = document.getElementById('dewpoint');
const uvIndex = document.getElementById('uv-index');
const moonPhase = document.getElementById('moon-phase');

// Daily Forecast section consts
const hourlyTime = document.querySelectorAll('.hourly-time');
const hourlyTemp = document.querySelectorAll('.hourly-temp');
const hourlyRain = document.querySelectorAll('.hourly-rain');

// Daily Forecast section consts
const shortDailyName = document.querySelectorAll('.short-daily-name')
const maxTempNext = document.querySelectorAll('.max-temp-next');
const minTempNext = document.querySelectorAll('.min-temp-next');
const dailyRainChance = document.querySelectorAll('.daily-rain');

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

// Function for showing the Icons depending on the Text
function setConditionIcon(conditionText, iconElement, lightRainIcon, mistIcon, overcastIcon, moderateRainIcon, partlyCloudyIcon, clearIcon, fogIcon, cloudyIcon, patchyRainIcon, lightDrizzleIcon, lightRainShowerIcon, otherIcon) {
  if (conditionText == "Light rain") {
    iconElement.innerHTML = lightRainIcon;
  } else if (conditionText == "Mist") {
    iconElement.innerHTML = mistIcon;
  } else if (conditionText == "Overcast") {
    iconElement.innerHTML = overcastIcon;
  } else if (conditionText == "Moderate rain") {
    iconElement.innerHTML = moderateRainIcon;
  } else if (conditionText == "Partly cloudy") {
    iconElement.innerHTML = partlyCloudyIcon;
  } else if (conditionText == "Clear") {
    iconElement.innerHTML = clearIcon;
  } else if (conditionText == "Fog") {
    iconElement.innerHTML = fogIcon;
  } else if (conditionText == "Cloudy") {
    iconElement.innerHTML = cloudyIcon;
  } else if (conditionText == "Patchy rain possible") {
    iconElement.innerHTML = patchyRainIcon;
  } else if (conditionText == "Light drizzle") {
    iconElement.innerHTML = lightDrizzleIcon;
  } else if (conditionText == "Light rain shower") {
    iconElement.innerHTML = lightRainShowerIcon;
  } else if (conditionText == "Heavy snow") {
    iconElement.innerHTML = heavySnowIcon;
  } else if (conditionText == "Moderate or heavy snow showers") {
    iconElement.innerHTML = moderateHeavySnowIcon;
  } else if (conditionText == "Patchy light snow") {
    iconElement.innerHTML = patchyLightSnowIcon;
  } else {
    iconElement.innerHTML = otherIcon;
  }
};

// Submit form on Header
form.addEventListener('submit', event => {
  event.preventDefault();
  const searchKeyword = searchInput.value;
  
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${searchKeyword}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      // Show the city name on every section of the Home Page
      cityCountry.forEach(node => {
        node.innerHTML = `${data.location.name}, ${data.location.country}`;
      });

      // Show the Realtime Time near to the city name
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

      // Show the Realtime temperature
      const currentTemp = data.current.temp_c; 
      realtimeTemp.innerHTML = `${currentTemp}°`;

      // Show the Condition text
      conditionText.innerHTML = data.current.condition.text;

      // Show the Condition Big Icon
      conditionIcon.forEach(function(iconElement) {
        setConditionIcon(data.current.condition.text, iconElement, lightRainIcon, mistIcon, overcastIcon, moderateRainIcon, partlyCloudyIcon, clearIcon, fogIcon, cloudyIcon, patchyRainIcon, lightDrizzleIcon, lightRainShowerIcon, otherIcon);
      });

      // Show the Day temperature
      dayTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].hour[12].temp_c)}°`;

      // Show the Night temperature
      nightTemp.innerHTML = `${Math.round(data.forecast.forecastday[1].hour[0].temp_c)}°`;

      // Show the Morning temperature and Chance of rain
      morningTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].hour[6].temp_c)}°`;
      rainChance[0].innerHTML = `${data.forecast.forecastday[0].hour[6].chance_of_rain}%`;

      // Show the Afternoon temperature and Chance of rain
      afternoonTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].hour[12].temp_c)}°`;
      rainChance[1].innerHTML = `${data.forecast.forecastday[0].hour[12].chance_of_rain}%`;

      // Show the Evening temperature and Chance of rain
      eveningTemp.innerHTML = `${Math.round(data.forecast.forecastday[0].hour[18].temp_c)}°`;
      rainChance[2].innerHTML = `${data.forecast.forecastday[0].hour[18].chance_of_rain}%`;

      // Show the Overnight temperature and Chance of rain
      overnightTemp.innerHTML = `${Math.round(data.forecast.forecastday[1].hour[0].temp_c)}°`;
      rainChance[3].innerHTML = `${data.forecast.forecastday[1].hour[0].chance_of_rain}%`;

      // Show the Feels Like temperature
      feelsLike.innerHTML = `${Math.round(data.current.feelslike_c)}°`;

      // Show the Humidity percentage
      humidity.innerHTML = `${data.current.humidity}%`;

      // Show the Pressure IN
      pressure.innerHTML = data.current.pressure_in;

      // Show the Visibility in KM
      visibility.innerHTML = data.current.vis_km;

      // Show the Wind in KPH
      wind.innerHTML = data.current.wind_kph;

      // Show the Dew Point
      dewpoint.innerHTML = `${data.forecast.forecastday[0].hour[1].dewpoint_c}°`;

      // Show the UV Index
      uvIndex.innerHTML = data.current.uv;

      // Show the Moon Phase
      moonPhase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;

      // Show the High / Low temperature
      for (let i = 0; i < maxTemp.length; i++) {
        maxTemp[i].innerHTML = `${Math.round(data.forecast.forecastday[0].day.maxtemp_c)}°`;
        minTemp[i].innerHTML = `${Math.round(data.forecast.forecastday[0].day.mintemp_c)}°`;
      }

      // Show the Max temperature for each tomorrow day
      maxTempNext[0].innerHTML = `${Math.round(data.forecast.forecastday[1].day.maxtemp_c)}°`;
      maxTempNext[1].innerHTML = `${Math.round(data.forecast.forecastday[2].day.maxtemp_c)}°`;
      maxTempNext[2].innerHTML = `${Math.round(data.forecast.forecastday[3].day.maxtemp_c)}°`;
      maxTempNext[3].innerHTML = `${Math.round(data.forecast.forecastday[4].day.maxtemp_c)}°`;

      // Show the Min temperature for each tomorrow day
      minTempNext[0].innerHTML = `${Math.round(data.forecast.forecastday[1].day.mintemp_c)}°`;
      minTempNext[1].innerHTML = `${Math.round(data.forecast.forecastday[2].day.mintemp_c)}°`;
      minTempNext[2].innerHTML = `${Math.round(data.forecast.forecastday[3].day.mintemp_c)}°`;
      minTempNext[3].innerHTML = `${Math.round(data.forecast.forecastday[4].day.mintemp_c)}°`;

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
        shortDailyName[i - 1].innerHTML = formattedDate;
      }
    });
});