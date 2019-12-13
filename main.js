console.log("Weather Exts.");




const xhr = new XMLHttpRequest();
let weatherAPIKey = "0901f1f0f6e54434f6f7c1d96f68ba5e";
let mainText = document.querySelector('.main-text');
let tempText = document.querySelector('.temp')
let localWeather = document.querySelector('.local-weather');




const getAndDisplayWeather = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            //we need to do something with our postion here//
            getLocalWeather(position.coords.latitude,
                position.coords.longitude)
        })
    }
    else {console.log("No geolocation, App Failed, FUCK U")}
};

const getLocalWeather = (latitude, longitude) => {
    xhr.open("GET", `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=imperial`, true);
    xhr.onreadystatechange =  () => {
      if (xhr.readyState == 4) {
        const response = JSON.parse(xhr.responseText);
        let temp = response.main.temp;
        let roundedTemp = Math.floor(temp)
        mainText.innerText = `You are in ${response.name}`;
        tempText.innerText = `The current temperature outside is ${roundedTemp}ºF`;
        updateBackground(response.weather[0].main)
      }
      else { console.log('Error connecting to OpenWeather')}
      }
    xhr.send();
  }

  const updateBackground = (weather) => {
    xhr.open("GET", `https://api.unsplash.com/photos/random?query=${weather}&client_id=f01d4443039b90b896a3d3a4488aa066f3dec1e4b0d85545d4353e627e44f612`, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        let response = JSON.parse(xhr.response)
        response.urls.full ? localWeather.style.background = `url(${response.urls.regular}) no-repeat center center fixed` : null
      }
      else {
        setDefaultBackground(weather)
      }
    }
    xhr.send()
  }




const clearUrl = 'https://unsplash.com/search/clear-sky?photo=fuAy6Gs8QCw';
const cloudUrl = 'https://unsplash.com/search/cloudy?photo=S7ChB4FBboI';
const rainUrl = 'https://unsplash.com/search/rain?photo=vg6zo_GJf1k';
const snowUrl = 'https://unsplash.com/search/snow?photo=67t2GJcD5PI';
const setDefaultBackground = (weather) => {
  weather.toLowerCase().includes('rain') ? localWeather.style.background = `url(${rainUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('clear') ? localWeather.style.background = `url(${clearUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('snow') ? localWeather.style.background = `url(${snowUrl}) no-repeat center center fixed` : null;
  weather.toLowerCase().includes('cloud') ? localWeather.style.background = `url(${cloudUrl}) no-repeat center center fixed` : null;
}



getAndDisplayWeather()
