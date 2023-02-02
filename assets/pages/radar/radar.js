const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mapIcons = document.getElementById("mapicons");
const tempIcons = document.getElementById("tempicons");

var map = L.map("map");
var cities = [
  "London",
  "Pristina",
  "Moscow",
  "Paris",
  "Berlin",
  "Berne",
  "Sofia",
  "Madrid",
  "Ljubljana",
  "Tirana",
  "Sarajevo",
  "Athens",
  "Rome",
  "Zagreb",
  "Stockholm",
  "Valletta",
  "Chisinau",
  "Skopje",
  "Luxembourg",
  "Vilnius",
  "Vaduz",
  "Riga",
  "Dublin",
  "Reykjavik",
  "Budapest",
  "Vatican City",
  "Helsinki",
  "Tallinn",
  "Copenhagen",
  "Prague",
  "Vienna",
  "Minsk",
  "Andorra La Vella",
  "Monaco",
  "Vilnius",
  "Podgorica",
  "Amsterdam",
  "Oslo",
  "Warsaw",
  "Lisbon",
  "Bucharest",
  "Belgrade",
  "San Marino",
  "Bratislava",
  "Prague",
  "Kiev",
];

let customIcon;
let marker;
let markers = [];
let tempUnit = "C"; 

const fButton = document.getElementById("fahrenheit");
fButton.addEventListener("click", () => {
    tempUnit = "F";
    localStorage.setItem("tempUnit", tempUnit);
    // location.reload();

});

const cButton = document.getElementById("celsius");
cButton.addEventListener("click", () => {
    tempUnit = "C";
    localStorage.setItem("tempUnit", tempUnit);
    // location.reload();

});



L.tileLayer("https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png", {
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    minZoom: 2.5,
    maxZoom: 15 }).addTo(map);

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`
        )
            .then((response) => response.json())
            .then((data) => {
                let output = "";
              
                output += `
              <h2>${data.location.name}</h2>
              <h1 ><b>${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b></h1>
              <h2>${data.current.condition.text}</h2>
              <h2>Feels like ${Math.round(data.current.feelslike_c)}°</h2>
              <img src="${data.current.condition.icon}">

            `;

        customIcon = L.icon({
            iconUrl: `https://images.squarespace-cdn.com/content/v1/5ddbecf4e7b0381e7563300c/1614442398525-CBYTHYX9P22FT9NW0BUH/pin.png`,
            iconSize: [60, 60],
            // iconAnchor: [22, 94],
            popupAnchor: [-3, -76],

        });

        marker = L.marker([lat, lng], {icon : customIcon}).addTo(map);
        marker.bindPopup(output);
        marker.openPopup();
        map.setView([lat, lng], 10);
        markers.push(marker);
      });
  });
} else {
    alert("Geolocation is not supported by this browser.");
    console.log("geolocation");
// }
};



form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchKeyword = searchInput.value;

    getRadarData(searchKeyword)
   
});





function getRadarData(lokacioni) {
  while (markers.length) {
    let marker = markers.pop();
    map.removeLayer(marker);
  }
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${lokacioni}&days=10&aqi=yes&alerts=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      showDataOnMap(data);
    });
}

function showDataOnMap(data) {
  const apilat = data.location.lat;
  const apilng = data.location.lon;
  let output = "";
  output += `
        <h2>${data.location.name}</h2>
        <h1 class="temperature"><b>${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b>
        <h2>${data.current.condition.text}</h2>
        <h2>Feels like ${Math.round(data.current.feelslike_c)}°</h2>
         <img src="${data.current.condition.icon}">
    `;
  customIcon = L.icon({
    iconUrl: `${data.current.condition.icon}`,
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
  });

  marker = L.marker([apilat, apilng], { icon: customIcon }).addTo(map);
  marker.bindPopup(output).openPopup();
  map.setView([apilat, apilng], 7);
  markers.push(marker);
}

mapIcons.addEventListener("click", (event) => {
  event.preventDefault();
  getMapIcons();
});

function getMapIcons() {
  while (markers.length) {
    let marker = markers.pop();
    map.removeLayer(marker);
  }

  cities.forEach(function (city) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.location.name === city) {
          var lat = data.location.lat;
          var lng = data.location.lon;

          customIcon = L.icon({
            iconUrl: `${data.current.condition.icon}`,
            iconSize: [70, 70],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
          });

                    var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                    marker.bindPopup(`<h2>${city}<span class="temperature"><b>  ${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b></span></h2>`);
                    map.setView([48.15, 17.02], 4);
                    markers.push(marker);

                }
            });
    });
}

tempIcons.addEventListener("click", (event) => {
  event.preventDefault();
  getTemp();
  map.setView([48.15, 17.02], 5);
});

function getTemp() {
  while (markers.length) {
    let marker = markers.pop();
    map.removeLayer(marker);
  }
  cities.forEach(function (city) {
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10`
    )
      .then((response) => response.json())
      .then((dataa) => {
        if (dataa.location.name === city) {
          if (dataa.current.temp_c <= 0) {
            getLowTemp(dataa);
          } else if (dataa.current.temp_c > 0 && dataa.current.temp_c < 5) {
            getMediumTemp(dataa);
          } else {
            getHighTemp(dataa);
          }
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  });
}

function getHighTemp(data) {
    var lat = data.location.lat;
    var lng = data.location.lon;
    let highTempIcon = L.divIcon({
        className: "high-temp-icon",
        html: '<i class="uil uil-temperature"></i>',
        iconSize: [30, 45]
    });

    var marker = L.marker([lat, lng], { icon: highTempIcon }).addTo(map);
    marker.bindPopup(`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b></span></h2>`);
                markers.push(marker);

}

function getMediumTemp(data) {
    var lat = data.location.lat;
    var lng = data.location.lon;
    let mediumTempIcon = L.divIcon({
        className: "medium-temp-icon",
        html: '<i class="uil uil-temperature-half"></i>',
        iconSize: [30, 45]
    });

    var marker = L.marker([lat, lng], { icon: mediumTempIcon }).addTo(map);
    marker.bindPopup(`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b></span></h2>`);
    markers.push(marker);
}

function getLowTemp(data) {
    var lat = data.location.lat;
    var lng = data.location.lon;
    let lowTempIcon = L.divIcon({
        className: "low-temp-icon",
        html: '<i class="uil uil-temperature-empty"></i>',
        iconSize: [30, 45]
    });
    var marker = L.marker([lat, lng], { icon: lowTempIcon }).addTo(map);
    marker.bindPopup(`<h2>${data.location.name}<span class="temperature"><b>  ${Math.round(tempUnit == 'C' ? data.current.temp_c : data.current.temp_f)}°</b></span></h2>`);
    markers.push(marker);}                
