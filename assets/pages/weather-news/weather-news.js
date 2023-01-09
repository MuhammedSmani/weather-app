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

// Weather News aside consts
const weatherNewsCards = document.querySelectorAll('.weather__news__latest__card');

function openWeatherUrl() {
    // Update the href attribute of the anchor element
    readMoreAnchor.href = weatherNewsUrl;
};

function getWeatherNews() {
    fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=297bf25a8f8a457d89a37392b0db687a`)
    .then(response => response.json())
    .then(data => {
        // Show the Title to the Weather Top Story title
        weatherTopTitle.innerHTML = data.articles[0].title;

        // Show the Author to the Weather Top Story author
        weatherTopAuthor.innerHTML = data.articles[0].author;

        // Show the Published Date to the Weather Top Story date
        let weatherDateString = data.articles[0].publishedAt;
        
        // Create a date object from the weatherDateString
        let weatherDate = new Date(weatherDateString);

        // Get the image URL from the API data
        const imageUrl = data.articles[0].urlToImage;

        // Set the src attribute of the img element to the image URL
        weatherTopImage.src = imageUrl;
        
        // Extract the day, month, and year from the date object
        let day = weatherDate.getDate();
        let month = weatherDate.getMonth() + 1;
        let year = weatherDate.getFullYear();

        weatherTopDate.innerHTML = `${day}-${month}-${year}`;

        // Show the Description to the Weather Top Story description        
        weatherTopDescription.innerHTML = data.articles[0].description;

        // Show the Content to the Weather Top Story content
        weatherTopContent.innerHTML = data.articles[0].content;

        weatherNewsUrl = data.articles[0].url;

        readMoreButton.addEventListener('click', openWeatherUrl);

        // Get the data for the Weather News aside
        for (let i = 0; i < 5; i++) {
            const imageUrl = data.articles[i].urlToImage;
            const title = data.articles[i].title;
          
            weatherNewsCards[i].innerHTML = `
              <img id="weather-news-image" src="${imageUrl}" alt="">
              <h4 id="weather-news-title">${title}</h4>
            `;
        }
    }
)};

getWeatherNews();