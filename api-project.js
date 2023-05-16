const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=`;
const apiKey = `&appid=00fd3601a5ec4393d8fc6091e478e2f8&units=metric`;
const weatherFahr = `https://api.openweathermap.org/data/2.5/weather?q=paris&appid=00fd3601a5ec4393d8fc6091e478e2f8&units=imperial`;

const icon = document.querySelector(".icon");
const searchBar = document.querySelector(".search-bar input");
const submitBtn = document.querySelector(".search-bar button");

const showResults = document.getElementById("loading");

async function getWeatherData(cityName) {
  // const { data } = await axios.get(weatherApi);
  // console.log(data);
  try {
    const response = await fetch(weatherApi + cityName + apiKey);

    if (response.status === 404) {
      document.getElementById("loading").style.display = "none";
    }

    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".feels-like").innerHTML =
      Math.round(data.main.feels_like) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".pressure").innerHTML = data.main.pressure;
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.getElementById("loading").style.display = "flex";

    if (data.weather[0].main == "Clouds") {
      icon.src = "weather-images/sun-cloud.png";
    } else if (data.weather[0].main == "Clear") {
      icon.src = "weather-images/sun.png";
    } else if (data.weather[0].main == "Rain") {
      icon.src = "weather-images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      icon.src = "weather-images/drizzle.png";
    }
  } catch (error) {
    console.log("error");
  }
}

getWeatherData();

submitBtn.addEventListener("click", () => {
  getWeatherData(searchBar.value);
});

const changeTempMeasurement = document.querySelector(".temperature");
const changeFeelsLikeMeasurement = document.querySelector(".feels-like");

async function changeMeasure() {
  const { data } = await axios.get(weatherFahr);
  changeTempMeasurement.innerHTML = Math.round(data.main.temp) + " °F";
  changeFeelsLikeMeasurement.innerHTML =
    Math.round(data.main.feels_like) + " °F";
}

changeTempMeasurement.addEventListener("click", (event) => {
  changeMeasure();
});

// fix so that when I unclick, it returns to celsius

window.addEventListener("load", () => {
  timerOn();
  function timerOn() {
    var date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const todaysDate = months[month] + " " + day + ", " + year;
    const todaysTime = hour + ":" + minute + ":" + second;

    const dateTime = todaysDate + "   -   " + todaysTime;

    document.getElementById("time").innerHTML = dateTime;
    setTimeout(timerOn, 1000);

    function changeBackground() {
      if (hours <= 6) {
        document.body.style.background =
          "linear-gradient(to left top, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))";
      } else if (6 < hours && hours < 8) {
        document.body.style.background =
          "linear-gradient(to top, rgb(251, 146, 60), rgb(56, 189, 248))";
      } else if (8 <= hours && hours < 20) {
        document.body.style.background =
          "linear-gradient(to top, rgb(219, 234, 254), rgb(147, 197, 253), rgb(59, 130, 246))";
      } else if (20 <= hours && hours < 22) {
        document.body.style.background =
          "linear-gradient(to top, rgb(251, 146, 60), rgb(56, 189, 248))";
      } else if (22 <= hours) {
        document.body.style.background =
          "linear-gradient(to top, rgb(29, 78, 216), rgb(30, 64, 175), rgb(17, 24, 39))";
      }
    }

    changeBackground();
  }
});

// fix the loading of the page
// fix the fahrenheit and celsius problem
