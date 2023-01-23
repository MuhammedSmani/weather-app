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