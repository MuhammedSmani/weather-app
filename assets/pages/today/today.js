const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const cityCountry = document.querySelectorAll('.city__country');
const realtimeTime = document.getElementById('realtime-time');
const realtimeTemp = document.getElementById('realtime-temp');
const dayTemp = document.getElementById('day-temp');
const nightTemp = document.getElementById('night-temp');
const morningTemp = document.getElementById('morning-temp');
const afternoonTemp = document.getElementById('afternoon-temp');
const eveningTemp = document.getElementById('evening-temp');
const overnightTemp = document.getElementById('overnight-temp');
const rainChance = document.querySelectorAll('.rain__chance')
const feelsLike = document.getElementById('feels-like');
const maxTemp = document.querySelectorAll('.max__temp');
const minTemp = document.querySelectorAll('.min__temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const wind = document.getElementById('wind');
const dewpoint = document.getElementById('dewpoint');
const uvIndex = document.getElementById('uv-index');
const moonPhase = document.getElementById('moon-phase');
const shortDailyName = document.querySelectorAll('.short__daily__name')
const maxTempNext = document.querySelectorAll('.max__temp__next');
const minTempNext = document.querySelectorAll('.min__temp__next');
const dailyRainChance = document.querySelectorAll('.daily__rain');

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

      // Show the Day temperature
      dayTemp.innerHTML = `${data.forecast.forecastday[0].hour[12].temp_c}°`;

      // Show the Night temperature
      nightTemp.innerHTML = `${data.forecast.forecastday[1].hour[0].temp_c}°`;

      // Show the Morning temperature and Chance of rain
      morningTemp.innerHTML = `${data.forecast.forecastday[0].hour[6].temp_c}°`;
      rainChance[0].innerHTML = `${data.forecast.forecastday[0].hour[6].chance_of_rain}%`;

      // Show the Afternoon temperature and Chance of rain
      afternoonTemp.innerHTML = `${data.forecast.forecastday[0].hour[12].temp_c}°`;
      rainChance[1].innerHTML = `${data.forecast.forecastday[0].hour[12].chance_of_rain}%`;

      // Show the Evening temperature and Chance of rain
      eveningTemp.innerHTML = `${data.forecast.forecastday[0].hour[18].temp_c}°`;
      rainChance[2].innerHTML = `${data.forecast.forecastday[0].hour[18].chance_of_rain}%`;

      // Show the Overnight temperature and Chance of rain
      overnightTemp.innerHTML = `${data.forecast.forecastday[1].hour[0].temp_c}°`;
      rainChance[3].innerHTML = `${data.forecast.forecastday[1].hour[0].chance_of_rain}%`;

      // Show the Feels Like temperature
      feelsLike.innerHTML = `${data.current.feelslike_c}°`;

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
      uvIndex.innerHTML = data.forecast.forecastday[0].hour[1].uv;

      // Show the Moon Phase
      moonPhase.innerHTML = data.forecast.forecastday[0].astro.moon_phase;

      // Show the High / Low temperature
      for (let i = 0; i < maxTemp.length; i++) {
        maxTemp[i].innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}°`;
        minTemp[i].innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}°`;
      }

      // Show the Max temperature for each tomorrow day
      maxTempNext[0].innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}°`;
      maxTempNext[1].innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}°`;
      maxTempNext[2].innerHTML = `${data.forecast.forecastday[3].day.maxtemp_c}°`;
      maxTempNext[3].innerHTML = `${data.forecast.forecastday[4].day.maxtemp_c}°`;

      // Show the Min temperature for each tomorrow day
      minTempNext[0].innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}°`;
      minTempNext[1].innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}°`;
      minTempNext[2].innerHTML = `${data.forecast.forecastday[3].day.mintemp_c}°`;
      minTempNext[3].innerHTML = `${data.forecast.forecastday[4].day.mintemp_c}°`;

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