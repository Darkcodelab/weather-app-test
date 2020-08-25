const key = "29d466f071859292f9acc69f81b7fcf4";
let temp = document.getElementById("temperature");
let sunriseDiv = document.getElementById("sunrise");
let sunsetDiv = document.getElementById("sunset");
let place = document.getElementById("place");
let rain = document.getElementById("rain");

function getPlaceName() {
  fetch("https://geolocation-db.com/json/697de680-a737-11ea-9820-af05f4014d91")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      place.innerText = json.city;
    });
}

getPlaceName();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

getLocation();

let latitude, longitude;

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  getTemp(latitude, longitude);
}

function getTemp(la, lo) {
  const URI = `https://api.openweathermap.org/data/2.5/onecall?lat=${la}&lon=${lo}&units=metric&&appid=${key}`;

  fetch(URI)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let sunriseTimeStamp = json.current.sunrise;
      let sunsetTimeStamp = json.current.sunset;
      let sunrise = timeStampConverter(sunriseTimeStamp);
      let sunset = timeStampConverter(sunsetTimeStamp);
      temp.innerHTML =
        json.current.temp +
        "<sup>&deg;</sup><small>C</small>" +
        `<sub><small>${cloudPercent(json.current.clouds)}</small></sub>`;
      sunriseDiv.innerText = sunrise.toString();
      sunsetDiv.innerText = sunset.toString();
      rain.innerText = json.current.weather[0].description;
    })
    .catch(function (error) {
      throw error;
    });
}

function timeStampConverter(data) {
  let dateObj = new Date(data * 1000);
  return dateObj.toLocaleTimeString();
}

function cloudPercent(data) {
  return data > 50 ? "cloudy" : "clear";
}

// function bgImage() {
//   let date = new Date();
//   if (date.getHours() > 16) {
//     document.getElementById("bg-image").src = "/assets/night.jpg";
//     document.getElementById("bg-image").style.opacity = 1;
//     document.body.style.color = "white";
//   }
// }
// bgImage();
