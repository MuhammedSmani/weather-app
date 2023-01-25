// const weeklyDescription = document.getElementById('weekly-main');
const weeklyDescription = document.querySelector('.weekly__description');

const weeklyTitle = document.querySelector('.weekly__title');

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

 weeklyDescription.innerHTML = '';



function showData(data) {
  data.forecast.forecastday.forEach((day, index) => {
    weeklyDescription.innerHTML += `  <div class="weekly__main" id="weekly-${index}" >
    <div>
        <span>${day.date}</span>
    </div>
    <div>
        <span><b>${Math.round(day.day.maxtemp_c)}°</b></span><span>/${Math.round(day.day.mintemp_c)}°</span>
    </div>
    <div>
        <i class="uil uil-cloud"></i> <span>${day.day.condition.text}</span>
    </div>
    <div>
        <i class="uil uil-raindrops"> </i><span>64%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW 5 km/h</span>
    </div>
    <div class="weekly-arrow" data-index=${index}>
    <i class="uil uil-angle-down"></i>
  </div>
  </div>
  <div class="weekly__hidden" id="hidden-${index}">
  <div class="day-hidden"> 
  <div>
    <h1> <b>${day.date}</b><span>|Day</span></h1>
    <h1><b>${Math.round(day.day.maxtemp_c)}°</b></h1>
    <p>${day.day.condition.text}</p>
    <div>
        <i class=" uil uil-raindrops"></i> <span>${day.day.daily_chance_of_rain}%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW ${day.day.maxwind_kph} km/h</span>
    </div>
  </div>
  <ul class="weekly__hidden__info">
    <li>
        <i class="uil uil-thermometer"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__feels__like">Feels like</span>
            <span class="weekly__feels__like__temp"><b>${day.day.feelslike_c}°</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-wind"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__wind">Wind</span>
            <span class="weekly__wind__temp"><b>NW ${day.day.maxwind_kph} km/h</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-tear"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__humidity">Humidity</span>
            <span class="weekly__humidity__temp"><b>${day.day.avghumidity}%</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-sun"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__uv__index">UV Index</span>
            <span class="weekly__uv__index__temp"><b>${day.day.uv} of 10</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-cloud"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__cloud__cover">Cloud Cover</span>
            <span class="weekly__cloud__cover__temp"><b>${day.day.cloud}%</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-raindrops-alt"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__rain__amount">Rain Amount</span>
            <span class="weekly__rain__amount__temp"><b>${day.day.totalprecip_mm} mm</b></span>
        </div>
    </li>
  </ul>
  </div>
  <div class="night-hidden"> 
  <div>
    <h1> <b>${day.date}</b><span>|Night</span></h1>
    <h1><b>${Math.round(day.day.maxtemp_c)}°</b></h1>
    <p>${day.day.condition.text}</p>
    <div>
        <i class=" uil uil-raindrops"></i> <span>${day.day.daily_chance_of_rain}%</span>
    </div>
    <div>
        <i class="uil uil-wind"></i> <span>NW ${day.day.maxwind_kph} km/h</span>
    </div>
  </div>
  <ul class="weekly__hidden__info">
    <li>
        <i class="uil uil-thermometer"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__feels__like">Feels like</span>
            <span class="weekly__feels__like__temp"><b>${day.day.feelslike_c}°</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-wind"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__wind">Wind</span>
            <span class="weekly__wind__temp"><b>NW ${day.day.maxwind_kph} km/h</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-tear"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__humidity">Humidity</span>
            <span class="weekly__humidity__temp"><b>${day.day.avghumidity}%</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-sun"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__uv__index">UV Index</span>
            <span class="weekly__uv__index__temp"><b>${day.day.uv} of 10</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-cloud"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__cloud__cover">Cloud Cover</span>
            <span class="weekly__cloud__cover__temp"><b>${day.day.cloud}%</b></span>
        </div>
    </li>
    <li>
        <i class="uil uil-raindrops-alt"></i>
        <div class="weekly__hidden__info__text">
            <span class="weekly__rain__amount">Rain Amount</span>
            <span class="weekly__rain__amount__temp"><b>${day.day.totalprecip_mm} mm</b></span>
        </div>
    </li>
  </ul>
  </div>
  </div>`;
  })
  const weeklyArrows = document.querySelectorAll('.weekly-arrow');
  const weeklyHidden = document.querySelectorAll('.weekly__hidden');


  weeklyArrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
      if (weeklyHidden[index].style.display === 'block') {
        weeklyHidden[index].style.display = 'none';
      } else {
        weeklyHidden.forEach((hidden) => {
          hidden.style.display = 'none';

        });
        weeklyHidden[index].style.display = 'block';

      }
    });
  })



    ;
}

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude,
      lng = position.coords.longitude;
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`
    )
      .then((response) => response.json())
      .then((data) => {
        showTitleData(data);
        showData(data);
      })
  })
};



form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchKeyword = searchInput.value;

  getMainData(searchKeyword);
});

function getMainData(lokacioni) {
  weeklyDescription.innerHTML = '';
  weeklyTitle.innerHTML = '';


  fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${lokacioni}&days=10&aqi=yes&alerts=yes`
  )
      .then((response) => response.json())
      .then((data) => {
        showTitleData(data);

          showData(data);
      });
}

function showTitleData(data){
  
  weeklyTitle.innerHTML += `
  <h1>7 Day Weather - <span id="city">${data.location.name}</span></h1>
  <p>As of <span id="current-time">Date(timeString).:44 pm</span>  CET</p>
  `

}

