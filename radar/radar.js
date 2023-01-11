let marker;
let radarpopup = document.getElementById('radar-popup')
const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
var map = L.map('map');

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        marker = L.marker([lat, lng]).addTo(map.setView([lat, lng], 7));
        marker.bindPopup(`No data available`);
        marker.openPopup();
    });
} else  {
    alert("Geolocation is not supported by this browser.");
    console.log("geolocation");
}

form.addEventListener('submit', event => {
    event.preventDefault();
    const searchKeyword = searchInput.value;

    getRadarData(searchKeyword);

})

function getRadarData(lokacioni){

    if (map.hasLayer(marker)) {
        map.removeLayer(marker);
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${lokacioni}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(dataa => {
        showDataOnMap(dataa);

});
}

function showDataOnMap(data){
    const apilat = data.location.lat;
    const apilng = data.location.lon;
    output = '';
    output += `
        <h2>${data.location.name}</h2>
        <h1><b>${data.current.temp_c}°</b></h1>
        <h2>${data.current.condition.text}</h2>
        <h2>Feels like ${data.current.feelslike_c}°</h2>
    `;
    radarpopup.innerHTML = output;

    marker = L.marker([apilat, apilng]).addTo(map);
    marker.bindPopup(radarpopup);
    marker.openPopup();
    map.setView([apilat, apilng], 7);
}