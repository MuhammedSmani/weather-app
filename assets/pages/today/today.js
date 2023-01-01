const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const weatherCity = document.getElementById('weather-city');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchKeyword = searchInput.value;
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${searchKeyword}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      weatherCity.innerHTML = `${data.location.name}, ${data.location.country}`;
    });
});