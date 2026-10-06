const apiKey = 'd19306fd5e899f84a622b552cba1b72a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        descriptionElement.textContent = 'Please enter a city name.';
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    descriptionElement.textContent = 'Loading...';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            locationElement.textContent = '';
            temperatureElement.textContent = '';
            descriptionElement.textContent = 'Unable to find weather for that city.';
        });
}