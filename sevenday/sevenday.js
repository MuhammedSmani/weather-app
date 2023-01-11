const weeklyArrows = document.querySelectorAll('.weekly-arrow');
const weeklyHidden = document.querySelectorAll('.weekly__hidden');
const weeklyMain = document.getElementById('weekly__main');




weeklyArrows.forEach((arrow, index) => {
  arrow.addEventListener('click', () => {
    if (weeklyHidden[index].style.display === 'block') {
      weeklyHidden[index].style.display = 'none';
      weeklyMain.style.display = 'none';
    } else {
      weeklyHidden.forEach((hidden) => {
        hidden.style.display = 'none';
      });
      weeklyHidden[index].style.display = 'block';
    }
  });
});


const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const city = document.getElementById('city');
const currentTime = document.getElementById('current-time');

form.addEventListener('submit', event => {
  event.preventDefault();
  const searchKeyword = searchInput.value;

  getWeather(searchKeyword);
  
})

function getWeather(location) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${location}&days=10&aqi=yes&alerts=yes`)
    .then(response => response.json())
    .then(data => {
      city.innerHTML = data.location.name;

      const timeString = data.location.localtime;
      const time = new Date(timeString);
      
      currentTime.innerHTML = formatTime(time);
    })
    .catch(error => {
      console.error(error);
    });
}



function formatTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let ampm = 'AM';
  
  if (hours > 12) {
    hours -= 12;
    ampm = 'PM';
  }
  
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${hours}:${minutes} ${ampm}`;
}


// const renderPosts = (days) => {
//   output = '';
//   days.forEach(day => {
//       output += `
//       <a href="./post/post.html?id=${post.id}">
//       <div class="post">
//           <div class="card-body">
//           <h5 class="card-title">${post.title}</h5>
//           <p class="card-text">${post.body}</p>
//           <a id="more" href=/user/user.html?id=${post.userId}></a>

//           </div>
//       </div>
//       <a>
//       `;
//   });
//   postList.innerHTML = output;
// }

// fetch(`https://api.weatherapi.com/v1/forecast.json?key=9ce000ab2ee94bf8bfd111052222012&q=${location}&days=10&aqi=yes&alerts=yes`)
//     .then(response => response.json())
//     .then(data => {})