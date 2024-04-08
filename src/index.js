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

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Prague");
