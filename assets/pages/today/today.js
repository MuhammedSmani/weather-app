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
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const wind = document.getElementById('wind');
const dewpoint = document.getElementById('dewpoint');
const uvIndex = document.getElementById('uv-index');
const moonPhase = document.getElementById('moon-phase');

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

      // Show the Afternoon temperature
      afternoonTemp.innerHTML = `${data.forecast.forecastday[0].hour[12].temp_c}°`;
      rainChance[1].innerHTML = `${data.forecast.forecastday[0].hour[12].chance_of_rain}%`;

      // Show the Evening temperature
      eveningTemp.innerHTML = `${data.forecast.forecastday[0].hour[18].temp_c}°`;
      rainChance[2].innerHTML = `${data.forecast.forecastday[0].hour[18].chance_of_rain}%`;

      // Show the Overnight temperature
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
      maxTemp.innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}°`;
      minTemp.innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}°`;
    });
});