let now = new Date();
let currentDate = document.querySelector("#day");
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Oct",
  "Dec",
];
let month = months[now.getMonth()];
currentDate.innerHTML = `${month}, ${now.getDate()}`;
let currentTime = document.querySelector("#time");
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Mon", "Tue", "Wed", "Thu", "Friday", "Sat", "Sun"];
let day = days[now.getDay()];

currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searching-city");
  let currentCity = document.querySelector("#city-holder");
  let city = `${searchInput.value}`;
  currentCity.innerHTML = `${searchInput.value}`;
  function showWeather(response) {
    let tempInCity = Math.round(response.data.main.temp);
    let degrees = document.querySelector("#temperature-now");
    degrees.innerHTML = `${tempInCity}`;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  let apiKey = "ea17f9de950250bef465c6a09403f488";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature-now");
  currentTemp.innerHTML = `${temperature}`;
  let geolocationCity = document.querySelector("#city-holder");
  geolocationCity.innerHTML = `${response.data.name}`;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
  let apiKey = "ea17f9de950250bef465c6a09403f488";

  let latitude = `${position.coords.latitude}`;
  let longitude = `${position.coords.longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", showTemp);

function changeUnit() {
  let tempInFahrenheit = document.querySelector("#temperature-now");
  let calculatedTemp = 17 * 1.8 + 32;
  tempInFahrenheit.innerHTML = calculatedTemp;
}
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeUnit);

function changeUnitBack() {
  let TempinCelsium = document.querySelector("#temperature-now");
  TempinCelsium.innerHTML = 17;
}
let celsiumUnit = document.querySelector("#celsium");
celsiumUnit.addEventListener("click", changeUnitBack);
