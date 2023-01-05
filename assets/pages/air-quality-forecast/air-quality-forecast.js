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
    pm25IndexInt[0].style.outlineColor = `red`;
    pm25IndexInt[1].style.outlineColor = `red`;
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
    coIndexInt.style.outlineColor = 'red';
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
    no2IndexInt.style.outlineColor = 'red';
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
    o3IndexInt.style.outlineColor = 'red';
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
    pm10IndexInt.style.outlineColor = 'green';
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
    so2IndexInt.style.outlineColor = 'red';
  }
};

// Submit form on Header
form.addEventListener('submit', event => {
    event.preventDefault();
    const searchKeyword = searchInput.value;
    
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${searchKeyword}&days=10&aqi=yes&alerts=yes`)
      .then(response => response.json())
      .then(data => {
        // Show the city name at Today's Air Quality title
        city.innerHTML = data.location.name;

        // Show the PM2.5 index and category
        pm25CategoryElements.forEach(function(pm25CategoryElement, index) {
          var pm25Num = Number(data.current.air_quality.pm2_5.toFixed(2));
          pm25Index.innerHTML = pm25Num;
          setPm25Category(pm25Num, pm25CategoryElement, pm25IndexInt, pm25CategoryText);
          pm25IndexInt[0].innerHTML = parseInt(pm25Num);
          pm25IndexInt[1].innerHTML = parseInt(pm25Num);
        });

        // Show the CO index and category
        var coNum = Number(data.current.air_quality.co.toFixed(2));
        coIndex.innerHTML = coNum;
        setCoCategory(coNum, coIndexInt, coCategory);
        coIndexInt.innerHTML = parseInt(coNum);

        // Show the NO2 index and category
        var no2Num = Number(data.current.air_quality.no2.toFixed(2));
        no2Index.innerHTML = no2Num;
        setNo2Category(no2Num, no2IndexInt, no2Category);
        no2IndexInt.innerHTML = parseInt(no2Num);

        // Show the O3 index and category
        var o3Num = Number(data.current.air_quality.o3.toFixed(2));
        o3Index.innerHTML = o3Num;
        setO3Category(o3Num, o3IndexInt, o3Category);
        o3IndexInt.innerHTML = parseInt(o3Num);

        // Show the PM10 index and category
        var pm10Num = Number(data.current.air_quality.pm10.toFixed(2));
        pm10Index.innerHTML = pm10Num;
        setPm10Category(pm10Num, pm10IndexInt, pm10Category);
        pm10IndexInt.innerHTML = parseInt(pm10Num);

        // Show the SO2 index and category
        var so2Num = Number(data.current.air_quality.so2.toFixed(2));
        so2Index.innerHTML = so2Num;
        setSo2ategory(so2Num, so2IndexInt, so2Category);
        so2IndexInt.innerHTML = parseInt(so2Num);
    })
});