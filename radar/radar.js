var map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('<h1> <b>Mon 02</b><span>|Night</span></h1><h1><b>6°</b></h1><p>Cloudy skies this evening will become partly cloudy after midnight. Areas of patchy fog. Low 4C. Winds light and variable.</p>')
    .openPopup();

