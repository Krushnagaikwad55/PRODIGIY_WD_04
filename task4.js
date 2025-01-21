// script.js

// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const conditions = document.getElementById("conditions");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeatherData(location);
  } else {
    showError("Please enter a location.");
  }
});

async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Location not found.");
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeatherData(data) {
  errorMessage.classList.add("hidden");
  weatherInfo.classList.remove("hidden");

  cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  conditions.textContent = `Conditions: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function showError(message) {
  weatherInfo.classList.add("hidden");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
