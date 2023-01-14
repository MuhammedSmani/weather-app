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
  return fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=297bf25a8f8a457d89a37392b0db687a`)
  .then(response => response.json());
};

// Get Weather Top Story data
function getWeatherTopStory(data) {
  const { title, author, source: { name }, description, content } = data.articles[0];
  weatherTopTitle.innerHTML = title;
  weatherTopAuthor.innerHTML = author;
  weatherTopSource.innerHTML = name;
  weatherTopDescription.innerHTML = description;

  const cleanedContent = content.replace(/\[\+\d+ chars\]/, "");
  weatherTopContent.innerHTML = cleanedContent;
};

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
};

// Get Weather Top Story image
function getWeatherTopStoryImage(data) {
  const imageUrl = data.articles[0].urlToImage;
  weatherTopImage.src = imageUrl;
};

// Update the href attribute of the anchor element
function openWeatherUrl(data) {
  readMoreAnchor.href = weatherNewsUrl;
  weatherNewsUrl = data.articles[0].url;
};

readMoreButton.addEventListener('click', openWeatherUrl);

// Get Weather News data aside
function getWeatherNewsAside(data) {
  const weatherNewsCards = document.querySelector(".weather__news__aside__cards");

  data.articles.slice(1, 4).forEach((article) => {
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
};

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
};

getWeatherNews();