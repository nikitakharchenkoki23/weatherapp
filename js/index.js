const API_KEY = '';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherBox = document.getElementById('weather-box');
const errorBox = document.getElementById('error-box');

const cityEl = document.getElementById('city');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// Event Listeners
searchBtn.addEventListener('click', () => getWeather(cityInput.value));

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather(cityInput.value);
    }
});

// Fetch Weather Function
async function getWeather(city) {
    if (!city.trim()) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'City not found');
        }

        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

// Render Data to DOM
function displayWeather(data) {
    errorBox.style.display = 'none';

    cityEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${data.main.humidity}%`;
    windEl.textContent = `${data.wind.speed} m/s`;

    weatherBox.style.display = 'block';
}

// Show Error Messages
function showError(message) {
    weatherBox.style.display = 'none';
    errorBox.textContent = message.charAt(0).toUpperCase() + message.slice(1);
    errorBox.style.display = 'block';
}
