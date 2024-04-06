function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-input");
  let cityName = document.getElementById("city-name");
  cityName.innerHTML = searchInput.value;
}

let searchFormElement = document.getElementById("search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
