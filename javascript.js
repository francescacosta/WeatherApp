if (navigator.geolocation) {

  //Return the user's longitude and latitude on page load using HTML5 geolocation API

  window.onload = function () {


    function getCurrentLocation (position) {
      console.log(position)

      latitude = position.coords.latitude;
      longitude = position.coords.longitude;


      //AJAX request

      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "", function (response) {
        // var rawJson = JSON.stringify(data);
        // var json = JSON.parse(rawJson);
        updateWeather(response); //Update Weather parameters
      });
    }

    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };
}


function updateWeather(json) {
  var temp = json.main.temp
  var minTemp = json.main.temp_min
  var maxTemp = json.main.temp_max
  var country = json.sys.country
  var city = json.name
  var wind = json.wind.speed
  var humidity = json.main.humidity
  var icon = json.weather[0].main

  updateCountryCity(city, country);
  updateTempFromKelvinToCelcius(temp);
  updateWind(wind);
  updateHumidity(humidity);
  updateMinTemp(minTemp);
  updateMaxTemp(maxTemp);
  updateIcon(icon);
  showApp();
  hideLoading();
}

function showApp() {
  document.getElementById('theApp').style.display = "unset";
}

function hideLoading() {
  document.getElementById("loading").style.display ="none"
}

function updateCountryCity(city, country) {
  document.getElementsByTagName('h1')[0].innerHTML = city + ', ' + country;
}

function updateTempFromKelvinToCelcius(temp) {
  document.getElementById("temperature").innerHTML = temp - 273.15;
}

function updateWind(wind) {
  document.getElementsByClassName("windInfo")[0].innerHTML = wind + "MPH";
}

function updateHumidity(humidity) {
  document.getElementsByClassName("humidityInfo")[0].innerHTML = humidity + "%";
}

function updateMinTemp(minTemp) {
  document.getElementsByClassName("minTempInfo")[0].innerHTML = (minTemp - 273.15) + "&deg";
}

function updateMaxTemp(maxTemp) {
  document.getElementsByClassName("maxTempInfo")[0].innerHTML = (maxTemp - 273.15) + "&deg";
}

function updateTempCelciusToFarenheight() {
  var temp = document.getElementById("temperature")
  temp = parseInt(temp.innerHTML)
  var far = (temp * 1.8) +32;
  document.getElementById("temperature").innerHTML = far;
}

function ctoF () {
  document.getElementsByClassName("celFar")[0].innerHTML = "F";
}

function updateTempFarenheightToCelcius() {
  var temp = document.getElementById("temperature")
  temp = parseInt(temp.innerHTML);
  var cel = ((temp - 32) * 5/9);
  document.getElementById("temperature").innerHTML = cel;
}

function ftoC () {
  document.getElementsByClassName("celFar")[0].innerHTML = "C";
}


// var icon = json.weather.main
function updateIcon(icon) {
  if (icon === "Thunderstorm") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/thunderstorm.jpg"
  } else if (icon === "Drizzle") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/showerrain.jpg"
  } else if (icon === "Rain") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/rain.jpg"
  } else if (icon === "Snow") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/snow.jpg"
  } else if (icon === "Clear") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/clearsky.jpg"
  } else if (icon === "Clouds") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/mist.jpg"
  } else if (icon === "Additional") {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/windy.jpg"
  } else {
    document.getElementsByTagName('img')[0].src = "http://i1102.photobucket.com/albums/g452/Francesca_Costa/fewclouds.jpg"
  }

}

function toggleWeather() {
  var celFar = document.getElementsByClassName("celFar")[0]

  if (celFar.innerHTML === 'C') {
    updateTempCelciusToFarenheight();
    ctoF();
  }
  else if (celFar.innerHTML === 'F') {
    updateTempFarenheightToCelcius();
    ftoC();
  }
}
