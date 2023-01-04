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
const pm25Category = document.getElementById('pm25-category');
const coCategory = document.getElementById('co-category');
const no2Category = document.getElementById('no2-category');
const o3Category = document.getElementById('o3-category');
const pm10Category = document.getElementById('pm10-category');
const so2Category = document.getElementById('so2-category');

// Function for showing the PM2.5 category depending on the PM2.5 index
function setPm25Category(pm25Num, pm25Category) {
  if (pm25Num < 12.5) {
    pm25Category.innerHTML = `Good`;
  } else if (pm25Num < 25) {
    pm25Category.innerHTML = `Fair`;
  } else if (pm25Num < 50) {
    pm25Category.innerHTML = `Poor`;
  } else if (pm25Num < 150) {
    pm25Category.innerHTML = `Very poor`;
  } else {
    pm25Category.innerHTML = `Extremely poor`;
  }
};

// Function for showing the CO category depending on the CO index
function setCoCategory(coNum, coCategory) {
  if (coNum < 30) {
    coCategory.innerHTML = `Good`;
  } else if (coNum < 70) {
    coCategory.innerHTML = `Poor`;
  } else {
    coCategory.innerHTML = `Extremely poor`;
  }
};

// Function for showing the NO2 category depending on the NO2 index
function setNo2Category(no2Num, no2Category) {
  if (no2Num < 60) {
    no2Category.innerHTML = `Good`;
  } else if (no2Num < 120) {
    no2Category.innerHTML = `Fair`;
  } else if (no2Num < 180) {
    no2Category.innerHTML = `Poor`;
  } else if (no2Num < 360) {
    no2Category.innerHTML = `Very poor`;
  } else {
    no2Category.innerHTML = `Extremely poor`;
  }
};

// Function for showing the O3 category depending on the O3 index
function setO3Category(o3Num, o3Category) {
  if (o3Num < 50) {
    o3Category.innerHTML = `Good`;
  } else if (o3Num < 100) {
    o3Category.innerHTML = `Moderate`;
  } else if (o3Num < 150) {
    o3Category.innerHTML = `Poor`;
  } else if (o3Num < 300) {
    o3Category.innerHTML = `Very poor`;
  } else {
    o3Category.innerHTML = `Hazardous`;
  }
};

// Function for showing the PM10 category depending on the PM10 index
function setPm10Category(pm10Num, pm10Category) {
  if (pm10Num < 40) {
    pm10Category.innerHTML = `Good`;
  } else if (pm10Num < 80) {
    pm10Category.innerHTML = `Fair`;
  } else if (pm10Num < 120) {
    pm10Category.innerHTML = `Poor`;
  } else if (pm10Num < 300) {
    pm10Category.innerHTML = `Very poor`;
  } else {
    pm10Category.innerHTML = `Extremely poor`;
  }
};

// Function for showing the SO2 category depending on the SO2 index
function setPm10Category(so2Num, so2Category) {
  if (so2Num < 100) {
    so2Category.innerHTML = `Good`;
  } else if (so2Num < 200) {
    so2Category.innerHTML = `Fair`;
  } else if (so2Num < 300) {
    so2Category.innerHTML = `Poor`;
  } else if (so2Num < 300) {
    so2Category.innerHTML = `Very poor`;
  } else {
    so2Category.innerHTML = `Extremely poor`;
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
        var pm25Num = Number(data.current.air_quality.pm2_5.toFixed(2));
        pm25Index.innerHTML = pm25Num;
        setPm25Category(pm25Num, pm25Category);

        // Show the CO index and category
        var coNum = Number(data.current.air_quality.co.toFixed(2));
        coIndex.innerHTML = coNum;
        setCoCategory(coNum, coCategory);

        // Show the NO2 index and category
        var no2Num = Number(data.current.air_quality.no2.toFixed(2));
        no2Index.innerHTML = no2Num;
        setNo2Category(no2Num, no2Category);

        // Show the O3 index and category
        var o3Num = Number(data.current.air_quality.o3.toFixed(2));
        o3Index.innerHTML = o3Num;
        setO3Category(o3Num, o3Category);

        // Show the PM10 index and category
        var pm10Num = Number(data.current.air_quality.pm10.toFixed(2));
        pm10Index.innerHTML = pm10Num;
        setPm10Category(pm10Num, pm10Category);

        // Show the SO2 index and category
        var so2Num = Number(data.current.air_quality.so2.toFixed(2));
        so2Index.innerHTML = so2Num;
        setPm10Category(so2Num, so2Category);
    })
});