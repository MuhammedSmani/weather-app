"use strict";
function onDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown");
  const arrows = document.querySelectorAll(".arrow");
  const closeArrows = document.querySelectorAll(".close_arrow");
  const weekendDays = document.querySelectorAll(".weekend-days");

  function toggleDropdown(dropdown, arrow, closeArrow) {
    dropdown.classList.toggle("hidden");
    arrow.classList.toggle("hidden");
    closeArrow.classList.toggle("hidden");
  }

  arrows.forEach((arrow, i) => {
    arrow.addEventListener("click", () =>
      toggleDropdown(dropdowns[i], arrow, closeArrows[i])
    );
  });

  closeArrows.forEach((closeArrow, i) => {
    closeArrow.addEventListener("click", () =>
      toggleDropdown(dropdowns[i], arrows[i], closeArrow)
    );
  });
}

const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=London&days=14&aqi=yes&alerts=yes`;

const fetchWeather = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const filteredData = data.forecast.forecastday.filter((x) => {
      const dt = new Date(x.date);
      const day = dt.getUTCDay();
      const today = new Date().getUTCDay();
      if (dt.getDate() === new Date().getDate()) {
        return false;
      }
      // remove next weeekend
      if (
        dt.getTime() > new Date().getTime() &&
        dt.getUTCDay() - today < 1 &&
        dt.getUTCDay() !== 0
      ) {
        return false;
      }

      return day === 5 || day === 6 || day === 0;
    });

    // Loop through the weekend data and generate the HTML
    const thisWeekend = filteredData.slice(0, 3);
    thisWeekend.forEach((day) => {
      const { date, day: dayData, hour } = day;
      const { maxtemp_c, mintemp_c, avgtemp_c, maxwind_kph } = dayData;
      const { condition } = hour[0];
      const { text, icon } = condition;
      const humidities = [hour[0].humidity, hour[12].humidity];
      const temperature = Math.round(avgtemp_c);
      // Sat 30, Sun 31, Mon 1
      const dayName = new Date(date).toLocaleDateString("en-UK", {
        weekday: "short",
        day: "numeric",
      });
      const windSpeed = Math.round(maxwind_kph);
      const description = text;
      const weatherDiv = `
      <div class="summary">
      <div class="for-weekend">
      <div class="weekend-days">
          <h3>${dayName}</h3>
          <div class="grade">
              <span>${temperature}°</span>
              <span>
                  /
                  <span>8°</span>
              </span>
          </div>
          <div class="logo">
              <i class="uil uil-cloud"></i>
              <span>${description}</span>
          </div>
          <div class="percentage">
              <span>0%</span>
          </div>
          <div class="wind">
              <span>Wind</span>
              <span>${windSpeed} km/h</span>
          </div>
          <div class="arrow">
              <i class="uil uil-arrow-down"></i>
          </div>
          <div class="close_arrow hidden">
              <i class="uil uil-arrow-up"></i>
          </div>
      </div>
      </div>
      <div class="dropdown hidden">
      <div class="dropdown-grade">
          <span> ${dayName} | Day </span>
          <div class="daily-content">
          <h2>${temperature}°</h2>
          <i class="uil uil-cloud-sun-rain"></i>
          <div class="logo-dropdown">
              <span>${windSpeed} km/h</span>
              <span>${description}</span>
          </div>
          </div>
          <p>
          Lorem ipsum dolor, sit amet consectetur
          <br />
          Voluptatibus ad quaerat, laudantium
          <br />
          cumque odio earum possimu
          </p>
      </div>
      <div class="dropdown-info">
        ${humidities.map((humidity) => {
          return `<div class="humidity broder-bottom">
          <i class="uil uil-tear"></i>
          <div class="index">
              <span>Humidity</span>
              <span>${humidity}%</span>
          </div>
          </div>`;
        })}
      </div>
      </div>
  </div>`;
      const currentWeekend = document.querySelector(".current-weekend");
      currentWeekend.innerHTML = weatherDiv;
    });
  } catch (error) {
    console.error(error);
  }
  ondropdown();
};

fetchWeather();
