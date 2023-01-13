// Form submit consts
const airCity = document.getElementById('air-city');

// Air Quality Forecast consts
const pm25Index = document.getElementById('pm25-index');
const coIndex = document.getElementById('co-index');
const no2Index = document.getElementById('no2-index');
const o3Index = document.getElementById('o3-index');
const pm10Index = document.getElementById('pm10-index');
const so2Index = document.getElementById('so2-index');

// Categories consts
const pm25CategoryElements = document.querySelectorAll('.pm25-category');
const pm25CategoryText = document.getElementById('pm25-category-text');
const coCategory = document.getElementById('co-category');
const no2Category = document.getElementById('no2-category');
const o3Category = document.getElementById('o3-category');
const pm10Category = document.getElementById('pm10-category');
const so2Category = document.getElementById('so2-category');

// Big integer Indexes
const pm25IndexInt = document.querySelectorAll('.pm25-index-int');
const coIndexInt = document.getElementById('co-index-int');
const no2IndexInt = document.getElementById('no2-index-int');
const o3IndexInt = document.getElementById('o3-index-int');
const pm10IndexInt = document.getElementById('pm10-index-int');
const so2IndexInt = document.getElementById('so2-index-int');

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
};

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
};

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
};

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
};

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
};

// Function for showing the SO2 category depending on the SO2 index
function setSo2ategory(so2Num, so2IndexInt, so2Category) {
  if (so2Num < 100) {
    so2Category.innerHTML = `Good`;
    so2IndexInt.style.outlineColor = 'green';
  } else if (so2Num < 200) {
    so2Category.innerHTML = `Fair`;
    so2IndexInt.style.outlineColor = 'yellow';
  } else if (so2Num < 300) {
    so2Category.innerHTML = `Poor`;
    so2IndexInt.style.outlineColor = 'orange';
  } else if (so2Num < 300) {
    so2Category.innerHTML = `Very poor`;
    so2IndexInt.style.outlineColor = 'red';
  } else {
    so2Category.innerHTML = `Extremely poor`;
    so2IndexInt.style.outlineColor = 'brown';
  }
};

function getWeatherData(city) {
  return fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${city}&days=10&aqi=yes&alerts=yes`)
  .then(response => response.json())
  .catch(error => {
      console.error(error);
  });
}

function updateTodayLink(city) {
  const todayPage = document.getElementById('today-page');
  todayPage.innerHTML = `<a href="../../../assets/pages/today/today.html?city=${city}" class="nav__link">Today </a>`;
}

function updateCityCountry(data) {
  const cityCountry = document.getElementById('air-city')
  cityCountry.innerHTML = `${data.location.name}, ${data.location.country}`;
}

function main() {
  let city = new URLSearchParams(window.location.search).get('city');
  if (city == null) {
      city = "tirana";
  }

  getWeatherData(city)
      .then(data => {
          updateTodayLink(city);
          updateCityCountry(data);
      })
      .catch(error => {
          console.error(error);
      });
}

main();

// OPEN AND CLOSE THE MODAL
const airQualityModal = document.querySelector('.air__quality__modal');
const triggerModal = document.querySelector('#air-quality-comments');
const closeModalButton = document.querySelector('.air__quality__close__btn');

function openModal(event) {
	// airQualityModal.style.top = (event.clientY) + "px";
	// airQualityModal.style.left = (event.clientX) + "px";
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