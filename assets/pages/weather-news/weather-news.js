// Weather Top Story consts
const weatherTopTitle = document.getElementById('weather-top-title');
const weatherTopAuthor = document.getElementById('weather-top-author');
const weatherTopSource = document.getElementById('weather-top-source');
const weatherTopDate = document.getElementById('weather-top-date');
const weatherTopImage = document.getElementById('weather-top-image');
const weatherTopDescription = document.getElementById('weather-top-description');
const weatherTopContent = document.getElementById('weather-top-content');
const readMoreButton = document.querySelector('.weather__news__button');
const readMoreAnchor = document.querySelector('#weather-top-url');
let weatherNewsUrl;

// Fetch Weather News data
function fetchWeatherNews() {
  // check if localStorage has a cache entry for the news
  if (localStorage.getItem(`cache-weather-news`)) {
    // read the cache entry
    const cacheData = JSON.parse(localStorage.getItem(`cache-weather-news`));
    // check if the cache data is still valid (1 hour)
    const currentTime = new Date();
    const cacheTime = new Date(cacheData.cacheTime);
    const timeDiff = (currentTime - cacheTime) / 3600000;
    if (timeDiff < 1) {
      // return the cached data
      return Promise.resolve(cacheData.data);
    }
  }
  // fetch the data from the API
  return fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=297bf25a8f8a457d89a37392b0db687a`)
    .then(response => response.json())
    .then(data => {
      // create a cache entry with the current time
      localStorage.setItem(`cache-weather-news`, JSON.stringify({ data: data, cacheTime: new Date() }));
      return data;
    });
}

// Get Weather Top Story data
function getWeatherTopStory(data) {
  const { title, author, source: { name }, description, content } = data.articles[0];
  weatherTopTitle.innerHTML = title;
  weatherTopAuthor.innerHTML = author;
  weatherTopSource.innerHTML = name;
  weatherTopDescription.innerHTML = description;

  const cleanedContent = content.replace(/\[\+\d+ chars\]/, "");
  weatherTopContent.innerHTML = cleanedContent;
}

// Get Weather Top Story date
function getWeatherTopStoryDate(data) {
  let weatherDateString = data.articles[0].publishedAt;

  // Create a date object from the weatherDateString
  let weatherDate = new Date(weatherDateString);

  // Extract the day, month, and year from the date object
  let day = weatherDate.getDate();
  let month = weatherDate.getMonth() + 1;
  let year = weatherDate.getFullYear();

  // Show the desired date format
  weatherTopDate.innerHTML = `${day}-${month}-${year}`;
}

// Get Weather Top Story image
function getWeatherTopStoryImage(data) {
  const imageUrl = data.articles[0].urlToImage;
  weatherTopImage.src = imageUrl;
}

// Update the href attribute of the anchor element
function openWeatherUrl(data) {
  readMoreAnchor.href = weatherNewsUrl;
  weatherNewsUrl = data.articles[0].url;
}

readMoreButton.addEventListener('click', openWeatherUrl);

// Get Weather News data aside
function getWeatherNewsAside(data) {
  const weatherNewsCards = document.querySelector(".weather__news__aside__cards");

  data.articles.slice(1, 5).forEach((article) => {
    const imageAsideUrl = article.urlToImage;
    const titleAside = article.title;
    const urlAside = article.url;
    const weatherNewsCard = `
      <div class="weather__news__aside__card">
        <a href="${urlAside}" target="_blank">
          <img class="weather-news-image" src="${imageAsideUrl}" alt="">
          <h4 class="weather-news-title">${titleAside}</h4>
        </a>
      </div>
    `;
    weatherNewsCards.insertAdjacentHTML("beforeend", weatherNewsCard);
  })
}

// Get All Weather News data
function getWeatherNews() {
  try {
    fetchWeatherNews()
    .then(data => {
      getWeatherTopStory(data);
      getWeatherTopStoryDate(data);
      getWeatherTopStoryImage(data);
      openWeatherUrl(data);
      getWeatherNewsAside(data);
    })
  } catch (error) {
    console.log("Error Occured: ", error);
  }
}

getWeatherNews();

// Autocomplete Search Form
let searchable = ["London", "Pristina", "Moscow", "Paris", "Berlin", "Berne", "Sofia", "Madrid", "Ljubljana", "Tirana", "Sarajevo", "Athens", "Rome", "Zagreb", "Stockholm",
"Valletta", "Chisinau", "Skopje", "Luxembourg", "Vilnius", "Vaduz", "Riga", "Dublin", "Reykjavik", "Budapest", "Vatican City", "Helsinki", "Tallinn", "Copenhagen", "Prague",
"Vienna", "Minsk", "Andorra La Vella", "Monaco", "Vilnius", "Podgorica", "Amsterdam", "Oslo", "Warsaw", "Lisbon", "Bucharest", "Belgrade", "San Marino", "Bratislava", "Prague", "Kiev"];

const searchInput = document.getElementById('search-input');
const searchField = document.querySelector('.search')
// const searchForm = document.getElementById('search-form');
const searchResults = document.querySelector('.search-results');

searchInput.addEventListener('keyup', () => {
  let results = [];
  let resultInput = searchInput.value;
  if (resultInput.length) {
    results = searchable.filter((item) => {
      return item.toLowerCase().includes(resultInput.toLowerCase())
    });
    if(!results.length) {
      searchResults.classList.remove('search-show');
      searchResults.innerHTML = "";
      return;
    }
  } else {
    searchResults.classList.remove('search-show');
    searchResults.innerHTML = "";
    return;
  }

  renderResults(results);
})

function renderResults(results) {
  if(!results.length) {
    return searchResults.classList.remove('search-show');
  }

  let searchContent = results.map((item) => {
    return `<li><a href="../../../assets/pages/today/today.html?city=${item}">${item}</a></li>`
  })
  .join('');

  searchResults.classList.add('search-show')
  searchResults.innerHTML = `<ul>${searchContent}</ul>`;
}