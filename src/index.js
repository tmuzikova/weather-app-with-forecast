//function to refresh the date info
function refreshDate(responsedDate) {
  let timestamp = responsedDate;
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = document.getElementById("current-day");
  currentDay.innerHTML = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let currentTime = document.getElementById("current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

//function that uses api response to update weather data on the site
function refreshWeatherData(response) {
  let currentTemp = document.getElementById("tempValue");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  let cityName = document.getElementById("city-name");
  cityName.innerHTML = response.data.city;

  let humidity = document.getElementById("humidity");
  let wind = document.getElementById("wind");
  let weatherDescription = document.getElementById("weather-description");
  let weatherPicture = document.getElementById("weather-picture");

  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = response.data.wind.speed.toFixed(1);
  weatherDescription.innerHTML = response.data.condition.description;
  weatherPicture.src = response.data.condition.icon_url;

  refreshDate(response.data.time);
}

//function to call api
function searchCity(city) {
  let apiKey = "6ddtf02cf3a61b83b8oaf010eba5f493";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeatherData);
}
//function to update the heading based on the search input
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-input");

  searchCity(searchInput.value);
}
//function to display forecast
function displayForecast() {
  let forecastElement = document.getElementById("weather-forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/869/869869.png"
          width="45"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">18°</span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
      </div>`;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Prague");
displayForecast();
