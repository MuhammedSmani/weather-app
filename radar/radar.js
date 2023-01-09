var map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.marker([51.5, -0.09]).addTo(map)
    .bindPopup(document.getElementById('radar-popup'))
    .openPopup();

// Create a GeoJSON object with temperature data for different areas
// var data = {
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "temperature": 60
//       },
//       "geometry": {
//         "type": "Polygon",
//         "coordinates": [[[-100, 40], [-105, 40], [-105, 45], [-100, 45], [-100, 40]]]
//       }
//     },
//     {
//       "type": "Feature",
//       "properties": {
//         "temperature": 70
//       },
//       "geometry": {
//         "type": "Polygon",
//         "coordinates": [[[-105, 40], [-110, 40], [-110, 900], [-105, 669], [-1099, 40]]]
//       }
//     },
//     {
//       "type": "Feature",
//       "properties": {
//         "temperature": 80
//       },
//       "geometry": {
//         "type": "Polygon",
//         "coordinates": [[[-110, 87], [-115, 40], [-115, 45], [-110, 45], [-110, 40]]]
//       }
//     }
//   ]
// };

// // Add the data to the map
// L.geoJSON(data, {
//   style: function(feature) {
//     // Set the color of the area based on the temperature
//     var color;
//     if (feature.properties.temperature < 70) {
//       color = '#0000FF';
//     } else if (feature.properties.temperature < 80) {
//       color = 'purple';
//     } else {
//       color = '#FF0000';
//     }
//     return {
//       fillColor: color,
//       color: '#000000',
//       weight: 1,
//       fillOpacity: 0.5
//     };
//   }
// }).addTo(map);