// Form submit consts
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const city = document.getElementById('city');

// Air Quality Forecast consts
const pm25Index = document.getElementById('pm25-index');
const coIndex = document.getElementById('co-index');
const no2Index = document.getElementById('no2-index');
const o3Index = document.getElementById('o3-index');
const pm10Index = document.getElementById('pm10-index');
const so2Index = document.getElementById('so2-index');

// Submit form on Header
form.addEventListener('submit', event => {
    event.preventDefault();
    const searchKeyword = searchInput.value;
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${searchKeyword}&days=10&aqi=yes&alerts=yes`)
      .then(response => response.json())
      .then(data => {
        // Show the city name at Today's Air Quality title
        city.innerHTML = data.location.name;

        // Show the PM2.5 index
        pm25Index.innerHTML = data.current.air_quality.pm2_5.toFixed(2);

        // Show the CO index
        coIndex.innerHTML = data.current.air_quality.co.toFixed(2);

        // Show the NO2 index
        no2Index.innerHTML = data.current.air_quality.no2.toFixed(2);

        // Show the O3 index
        o3Index.innerHTML = data.current.air_quality.o3.toFixed(2);

        // Show the PM10 index
        pm10Index.innerHTML = data.current.air_quality.pm10.toFixed(2);

        // Show the SO2 index
        so2Index.innerHTML = data.current.air_quality.so2.toFixed(2);
    })
});