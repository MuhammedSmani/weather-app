// Update Today page link
function updateTodayPage(city) {
  const todayPages = document.querySelectorAll('.today-page');
  todayPages.forEach(todayPage => {
    todayPage.innerHTML = `<a href="../../../assets/pages/today/today.html?city=${city}" class="nav__link">Today</a>`;
  });
}

// Update Air Quality page link
function updateAirQualityPage(city) {
  const airQualityPages = document.querySelectorAll('.airquality-page');
  airQualityPages.forEach(airQualityPage => {
    airQualityPage.innerHTML = `<a href="../../../assets/pages/air-quality-forecast/air-quality-forecast.html?city=${city}" class="nav__link">Air Quality</a>`;
  });
}

// Update Hourly page link
function updateHourlyPage(city) {
  const hourlyPages = document.querySelectorAll('.hourly-page');
  hourlyPages.forEach(hourlyPage => {
    hourlyPage.innerHTML = `<a href="../../../assets/pages/hourly/hourly.html?city=${city}" class="nav__link">Hourly</a>`;
  });
}

// Update 7 Day page link
function updateSevenDayPage(city) {
  const sevenDayPages = document.querySelectorAll('.sevenday-page');
  sevenDayPages.forEach(sevenDayPage => {
    sevenDayPage.innerHTML = `<a href="../../../assets/pages/sevenday/sevenday.html?city=${city}" class="nav__link">7 Day</a>`;
  });
}

// Update Weekend page link
function updateWeekendPage(city) {
  const weekendPages = document.querySelectorAll('.weekend-page');
  weekendPages.forEach(weekendPage => {
    weekendPage.innerHTML = `<a href="../../../assets/pages/weekend/weekend.html?city=${city}" class="nav__link">Weekend</a>`;
  });
}

// Update Monthly page link
function updateMonthlyPage(city) {
  const monthlyPages = document.querySelectorAll('.monthly-page');
  monthlyPages.forEach(monthlyPage => {
    monthlyPage.innerHTML = `<a href="../../../assets/pages/monthly/monthly.html?city=${city}" class="nav__link">Monthly</a>`;
  });
}

// Update Radar page link
function radarPage(city) {
  const radarPages = document.querySelectorAll('.radar-page');
  radarPages.forEach(radarPage => {
    radarPage.innerHTML = `<a href="../../../assets/pages/radar/radar.html?city=${city}" class="nav__link">Radar</a>`;
  });
}

// Update Navbar links
function updateNavbarLinks(city) {
  updateTodayPage(city);
  updateAirQualityPage(city);
  updateHourlyPage(city);
  updateSevenDayPage(city);
  updateWeekendPage(city);
  updateMonthlyPage(city);
  radarPage(city);
}

// Open and Close the Modal
const airQualityModal = document.querySelector('.air__quality__modal');
const triggerModal = document.querySelector('#air-quality-comments');
const closeModalButton = document.querySelector('.air__quality__close__btn');

function openModal(event) {
	airQualityModal.classList.add('show-modal');
	airQualityModal.classList.remove('close-modal');
}

function closeModal() {
	airQualityModal.classList.add('close-modal');
	airQualityModal.classList.remove('show-modal');
}

function windowOnScroll(event) {
	closeModal();
}

triggerModal.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('scroll', windowOnScroll);

// Get City and Country data
function getCityCountry(data) {
  const cityCountry = document.getElementById('city-country')
  cityCountry.innerHTML = `${data.location.name}, ${data.location.country}`;
}

// PM25 consts
const pm25Index = document.getElementById('pm25-index');
const pm25CategoryElements = document.querySelectorAll('.pm25-category');
const pm25CategoryText = document.getElementById('pm25-category-text');
const pm25IndexInt = document.querySelectorAll('.pm25-index-int');

// Function for showing the PM2.5 category depending on the PM2.5 index
function setPm25Category(pm25Num, pm25CategoryElement, pm25IndexInt, pm25CategoryText) {
  if (pm25Num < 12.5) {
    pm25CategoryElement.innerHTML = `Good`;
    pm25CategoryText.innerHTML = `Air quality is considered satisfactory, and air pollution poses little or no risk.`;
    pm25IndexInt[0].style.outlineColor = `green`;
    pm25IndexInt[1].style.outlineColor = `green`;
  } else if (pm25Num < 25) {
    pm25CategoryElement.innerHTML = `Fair`;
    pm25CategoryText.innerHTML = `Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.`;
    pm25IndexInt[0].style.outlineColor = `yellow`;
    pm25IndexInt[1].style.outlineColor = `yellow`;
  } else if (pm25Num < 50) {
    pm25CategoryElement.innerHTML = `Poor`;
    pm25CategoryText.innerHTML = `Members of sensitive groups may experience health effects. The general public is not likely to be affected.`;
    pm25IndexInt[0].style.outlineColor = `orange`;
    pm25IndexInt[1].style.outlineColor = `orange`;
  } else if (pm25Num < 150) {
    pm25CategoryElement.innerHTML = `Very poor`;
    pm25CategoryText.innerHTML = `Health warnings of emergency conditions. The entire population is more likely to be affected.`;
    pm25IndexInt[0].style.outlineColor = `red`;
    pm25IndexInt[1].style.outlineColor = `red`;
  } else {
    pm25CategoryElement.innerHTML = `Extremely poor`;
    pm25CategoryText.innerHTML = `Health alert: everyone may experience more serious health effects.`;
    pm25IndexInt[0].style.outlineColor = `brown`;
    pm25IndexInt[1].style.outlineColor = `brown`;
  }
}

// Show PM2.5 index, category, color
function getPm25Data(data) {
  pm25CategoryElements.forEach(function(pm25CategoryElement, index) {
    var pm25Num = Number(data.current.air_quality.pm2_5.toFixed(2));
    pm25Index.innerHTML = pm25Num;
    setPm25Category(pm25Num, pm25CategoryElement, pm25IndexInt, pm25CategoryText);
    pm25IndexInt[0].innerHTML = parseInt(pm25Num);
    pm25IndexInt[1].innerHTML = parseInt(pm25Num);
  });
}

// CO consts
const coIndex = document.getElementById('co-index');
const coCategory = document.getElementById('co-category');
const coIndexInt = document.getElementById('co-index-int');

// Function for showing the CO category depending on the CO index
function setCoCategory(coNum, coIndexInt, coCategory) {
  if (coNum < 30) {
    coCategory.innerHTML = `Good`;
    coIndexInt.style.outlineColor = 'green';
  } else if (coNum < 70) {
    coCategory.innerHTML = `Poor`;
    coIndexInt.style.outlineColor = 'black';
  } else {
    coCategory.innerHTML = `Extremely poor`;
    coIndexInt.style.outlineColor = 'brown';
  }
}

// Show CO index, category, color
function getCoData(data) {
  var coNum = Number(data.current.air_quality.co.toFixed(2));
  coIndex.innerHTML = coNum;
  setCoCategory(coNum, coIndexInt, coCategory);
  coIndexInt.innerHTML = parseInt(coNum);
}

// NO2 consts
const no2Index = document.getElementById('no2-index');
const no2Category = document.getElementById('no2-category');
const no2IndexInt = document.getElementById('no2-index-int');

// Function for showing the NO2 category depending on the NO2 index
function setNo2Category(no2Num, no2IndexInt, no2Category) {
  if (no2Num < 60) {
    no2Category.innerHTML = `Good`;
    no2IndexInt.style.outlineColor = 'green';
  } else if (no2Num < 120) {
    no2Category.innerHTML = `Fair`;
    no2IndexInt.style.outlineColor = 'yellow';
  } else if (no2Num < 180) {
    no2Category.innerHTML = `Poor`;
    no2IndexInt.style.outlineColor = 'orange';
  } else if (no2Num < 360) {
    no2Category.innerHTML = `Very poor`;
    no2IndexInt.style.outlineColor = 'red';
  } else {
    no2Category.innerHTML = `Extremely poor`;
    no2IndexInt.style.outlineColor = 'brown';
  }
}

// Show NO2 index, category, color
function getNo2Data(data) {
  var no2Num = Number(data.current.air_quality.no2.toFixed(2));
  no2Index.innerHTML = no2Num;
  setNo2Category(no2Num, no2IndexInt, no2Category);
  no2IndexInt.innerHTML = parseInt(no2Num);
}

// O3 consts
const o3Index = document.getElementById('o3-index');
const o3Category = document.getElementById('o3-category');
const o3IndexInt = document.getElementById('o3-index-int');

// Function for showing the O3 category depending on the O3 index
function setO3Category(o3Num, o3IndexInt, o3Category) {
  if (o3Num < 50) {
    o3Category.innerHTML = `Good`;
    o3IndexInt.style.outlineColor = 'green';
  } else if (o3Num < 100) {
    o3Category.innerHTML = `Moderate`;
    o3IndexInt.style.outlineColor = 'yellow';
  } else if (o3Num < 150) {
    o3Category.innerHTML = `Poor`;
    o3IndexInt.style.outlineColor = 'orange';
  } else if (o3Num < 300) {
    o3Category.innerHTML = `Very poor`;
    o3IndexInt.style.outlineColor = 'red';
  } else {
    o3Category.innerHTML = `Hazardous`;
    o3IndexInt.style.outlineColor = 'brown';
  }
}

// Show 03 index, category, color
function getO3Data(data) {
  var o3Num = Number(data.current.air_quality.o3.toFixed(2));
  o3Index.innerHTML = o3Num;
  setO3Category(o3Num, o3IndexInt, o3Category);
  o3IndexInt.innerHTML = parseInt(o3Num);
}

// PM10 consts
const pm10Index = document.getElementById('pm10-index');
const pm10Category = document.getElementById('pm10-category');
const pm10IndexInt = document.getElementById('pm10-index-int');

// Function for showing the PM10 category depending on the PM10 index
function setPm10Category(pm10Num, pm10IndexInt, pm10Category) {
  if (pm10Num < 40) {
    pm10Category.innerHTML = `Good`;
    pm10IndexInt.style.outlineColor = 'green';
  } else if (pm10Num < 80) {
    pm10Category.innerHTML = `Fair`;
    pm10IndexInt.style.outlineColor = 'yellow';
  } else if (pm10Num < 120) {
    pm10Category.innerHTML = `Poor`;
    pm10IndexInt.style.outlineColor = 'orange';
  } else if (pm10Num < 300) {
    pm10Category.innerHTML = `Very poor`;
    pm10IndexInt.style.outlineColor = 'red';
  } else {
    pm10Category.innerHTML = `Extremely poor`;
    pm10IndexInt.style.outlineColor = 'brown';
  }
}

// Show PM10 index, category, color
function getPm10Data(data) {
  var pm10Num = Number(data.current.air_quality.pm10.toFixed(2));
  pm10Index.innerHTML = pm10Num;
  setPm10Category(pm10Num, pm10IndexInt, pm10Category);
  pm10IndexInt.innerHTML = parseInt(pm10Num);
}

// SO2 consts
const so2Index = document.getElementById('so2-index');
const so2Category = document.getElementById('so2-category');
const so2IndexInt = document.getElementById('so2-index-int');

// Function for showing the SO2 category depending on the SO2 index
function setSo2Category(so2Num, so2IndexInt, so2Category) {
  var valuenow;
  if (so2Num < 100) {
    so2Category.innerHTML = `Good`;
    valuenow = 1;
  } else if (so2Num < 200) {
    so2Category.innerHTML = `Fair`;
    valuenow = 2;
  } else if (so2Num < 300) {
    so2Category.innerHTML = `Poor`;
    valuenow = 3;
  } else if (so2Num < 400) {
    so2Category.innerHTML = `Very poor`;
    valuenow = 4;
  } else {
    so2Category.innerHTML = `Extremely poor`;
    valuenow = 5;
  }
  so2IndexInt.style.setProperty("--value", valuenow*20);
  so2IndexInt.innerHTML = valuenow;
}

// Show SO2 index, category, color
function getSo2Data(data) {
  const so2Num = Number(data.current.air_quality.so2.toFixed(2));
  so2Index.innerHTML = so2Num;
  setSo2Category(so2Num, so2IndexInt, so2Category);
}

// Constants
const apiKey = '9ce000ab2ee94bf8bfd111052222012';
const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&days=10&aqi=yes&alerts=yes`;
const searchForm = document.getElementById('search-form');
const searchParams = new URLSearchParams(window.location.search);

searchForm.addEventListener('submit', getCityValue);

// Get the city name value in search input
function getCityValue(event) {
  event.preventDefault();
  const city = document.getElementById('search-input').value;
  updateSearchParams(city)
  fetchWeatherData(city);
}

//
function updateSearchParams(city) {
  searchParams.set("city", city);
  window.history.pushState({}, "", `${window.location.pathname}?${searchParams.toString()}`);
}

// Fetch Weather data based on city
function fetchWeatherData(city) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=10&aqi=yes&alerts=yes`)
    .then((response) => response.json())
    .then((data) => {
      updateNavbarLinks(city);
      getCityCountry(data);
      getPm25Data(data);
      getCoData(data);
      getNo2Data(data);
      getO3Data(data);
      getPm10Data(data);
      getSo2Data(data);
    });
}

// Get the city name from the URL
// function getCityFromUrl() {
//   searchParams;
//   let city = searchParams.get("city");
//   if (city) {
//     return city;
//   }
// }

// Fetch Weather data based on the Geolocation
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  // Fetch weather data based on current location
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lng}&days=10&aqi=yes&alerts=yes`)
    .then((response) => response.json())
    .then((data) => {
      const city = data.location.name;
      if(localStorage.getItem('city') && localStorage.getItem('city') === city && window.location.search) return
      // Set city name in input field
      document.getElementById("search-input").value = city;
      localStorage.setItem('city', city);
      // Update the URL with the city value
      updateSearchParams(city);
      fetchWeatherData(city);
    });
}, (error) => {
    console.log(error);
});

// Get the city name from the URL
const cityFromUrl = searchParams.get("city");
if (cityFromUrl) {
  document.getElementById("search-input").value = cityFromUrl;
  fetchWeatherData(cityFromUrl);
}