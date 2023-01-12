const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const mapIcons = document.getElementById("mapicons");

var map = L.map("map");
var cities = ["London", "Pristina", "Moscow", "Paris", "Berlin", "Berne", "Sofia", "Madrid", "Ljublana", "Tirana", "Sarajevo", "Athens", "Rome", "Zagreb", "Stockholm",
    "Valletta", "Chisinau", "Skopje", "Luxembourg", "Vilnius", "Vaduz", "Riga", "Dublin", "Reykjavik", "Budapest", "Vatican City", "Helsinki", "Tallinn", "Copenhagen", "Prague",
    "Vienna", "Minsk", "Andorra La Vella", "Monaco", "Vilnius", "Podgorica", "Amsterdam", "Oslo", "Warsaw", "Lisbon", "Bucharest", "Belgrade", "San Marino", "Bratislava", "Prague", "Kyiv"];

let customIcon;
let marker;



L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

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
              <h1><b>${data.current.temp_c}°</b></h1>
              <h2>${data.current.condition.text}</h2>
              <h2>Feels like ${data.current.feelslike_c}°</h2>
              <img src="${data.current.condition.icon}">


            `;

                customIcon = L.icon({
                    iconUrl: `${data.current.condition.icon}`,
                    iconSize: [90, 90],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],

                });

                // var customCircle = L.circle([lat, lng], {
                //     color: 'red',
                //     fillColor: '#f03',
                //     fillOpacity: 0.5,
                // }).addTo(map);

                marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                marker.bindPopup(output);
                marker.openPopup();
                map.setView([lat, lng], 10);
            });
    });
} else {
    alert("Geolocation is not supported by this browser.");
    console.log("geolocation");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchKeyword = searchInput.value;

    getRadarData(searchKeyword);
});

function getRadarData(lokacioni) {
    if (map.hasLayer(marker)) {
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
        <h1><b>${data.current.temp_c}°</b>
        <h2>${data.current.condition.text}</h2>
        <h2>Feels like ${data.current.feelslike_c}°</h2>
         <img src="${data.current.condition.icon}">
    `;
    customIcon = L.icon({
        iconUrl: `${data.current.condition.icon}`,
        iconSize: [60, 60],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });


    marker = L.marker([apilat, apilng], { icon: customIcon }).addTo(map);
    marker.bindPopup(output).openPopup();
    map.setView([apilat, apilng], 7);
}

mapIcons.addEventListener("click", (event) => {
    event.preventDefault();
    removeMarkers();

})

function removeMarkers() {
    if (map.hasLayer(marker)) {
        map.removeLayer(marker);
    }


    cities.forEach(function (city) {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10`)
            .then((response) => response.json())
            .then((data) => {
                if (data.location.name === city) {
                    var lat = data.location.lat;
                    var lng = data.location.lon;

                    var customIcon = L.icon({
                        iconUrl: `${data.current.condition.icon}`,
                        iconSize: [70, 70],
                        iconAnchor: [22, 94],
                        popupAnchor: [-3, -76],
                    });

                    var marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                    marker.bindPopup(`<h2>${city}<span><b>  ${data.current.temp_c}°</b></span></h2>`);
                    map.setView([48.15, 17.02], 4);
                    markers.push(marker);

                }
            });
    });
}