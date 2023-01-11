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
var sunnyIcon = `<i class="uil uil-brightness"></i>`;
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
function setConditionIcon(conditionText, iconElement, lightRainIcon, sunnyIcon, mistIcon, overcastIcon, moderateRainIcon, partlyCloudyIcon, clearIcon, fogIcon, cloudyIcon, patchyRainIcon, lightDrizzleIcon, lightRainShowerIcon, heavySnowIcon, moderateHeavySnowIcon, patchyLightSnowIcon, otherIcon) {
  if (conditionText == "Light rain") {
    iconElement.innerHTML = lightRainIcon;
  } else if (conditionText == "Sunny") {
    iconElement.innerHTML = sunnyIcon;
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

function getWeatherData(city) {
  return fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10&aqi=yes&alerts=yes`)
  .then(response => response.json())
  .catch(error => {
      console.error(error);
  });
}

function updateAirQualityLink(city) {
  const airQualityPage = document.getElementById('air-quality-page');
  airQualityPage.innerHTML = `<a href="../../../assets/pages/air-quality-forecast/air-quality-forecast.html?city=${city}" class="nav__link">Air Quality </a>`;
}

function updateCityCountry(data) {
  cityCountry.forEach(node => {
      node.innerHTML = `${data.location.name}, ${data.location.country}`;
  });
}

function updateRealtimeTime(data) {
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

function updateRealtimeTemp(data) {
  const currentTemp = data.current.temp_c;
  realtimeTemp.innerHTML = `${Math.round(currentTemp)}°`;
}

function updateConditionText(data) {
  conditionText.innerHTML = data.current.condition.text;
}

function updateConditionIcon(data) {
  conditionIcon.forEach(function(iconElement) {
      setConditionIcon(data.current.condition.text, iconElement, lightRainIcon, mistIcon, overcastIcon, moderateRainIcon, partlyCloudyIcon, clearIcon, fogIcon, cloudyIcon, patchyRainIcon, lightDrizzleIcon, lightRainShowerIcon, otherIcon);
  });
}

function updateWeatherToday(data) {
  feelsLike.innerHTML = `${Math.round(data.current.feelslike_c)}°`;
  humidity.innerHTML = `${data.current.humidity}%`;
  pressure.innerHTML = data.current.pressure_in;
  visibility.innerHTML = data.current.vis_km;
  wind.innerHTML = data.current.wind_kph;
  uvIndex.innerHTML = data.current.uv;
}

function main() {
  let city = new URLSearchParams(window.location.search).get('city');
  if (city == null) {
      city = "tirana";
  }

  getWeatherData(city)
      .then(data => {
          updateAirQualityLink(city);
          updateCityCountry(data);
          updateRealtimeTime(data);
          updateRealtimeTemp(data);
          updateConditionText(data);
          updateConditionIcon(data);
          updateWeatherToday(data)
      })
      .catch(error => {
          console.error(error);
      });
}

main();