const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const realtimeCity = document.getElementById('realtime-city');
const realtimeTime = document.getElementById('realtime-time');
const realtimeTemp = document.getElementById('realtime-temp');
// const dayTemp = document.getElementById('day-temp');
// const nightTemp = document.getElementById('night-temp');
const todaysCity = document.getElementById('todays-city');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchKeyword = searchInput.value;
  
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${searchKeyword}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      // Show the city on Realtime Section
      realtimeCity.innerHTML = `${data.location.name}, ${data.location.country}`;

      // Realtime time near to city
      const timeString = data.location.localtime;
      const time = new Date(timeString);

      let hours = time.getHours();
      let minutes = time.getMinutes();
      let ampm = 'AM';
    
      if (hours > 12) {
        hours -= 12;
        ampm = 'PM';
      }

      realtimeTime.innerHTML = `As of ${hours}:${minutes} ${ampm} CET`;

      // Show the realtime temperature
      const currentTemp = data.current.temp_c; 
      realtimeTemp.innerHTML = `${currentTemp}°`;

      // Show the city on Today's Forecast Section
      todaysCity.innerHTML = `Today's Forecast for ${data.location.name}, ${data.location.country}`;
    });
});