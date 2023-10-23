document.getElementById("xhr-btn").addEventListener("click",getWeatherUsingXHR)
document.getElementById("fetch-btn").addEventListener("click",getWeatherUsingFetch)
document.getElementById("fetch-async-btn").addEventListener("click",getWeatherUsingFetchAsyncAwait)

function getWeatherUsingXHR() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var respObj = JSON.parse(xhttp.responseText);
            displayWeather(respObj.hourly.temperature_2m[0]);
        }
    };

    xhttp.open("GET", "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m");
    xhttp.send();
}




function getWeatherUsingFetch() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
        let url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m";
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (responseText) {
                let respObj = JSON.parse(responseText);
                displayWeather(respObj.hourly.temperature_2m[0]);
            })
            .catch(function (e) {
                console.log("Error: " + e);
            })
}

async function getWeatherUsingFetchAsyncAwait() {
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    let url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&hourly=temperature_2m";
    let response = await fetch(url); // this is an async call
    let respObj = await response.json(); // this is an async call
    displayWeather(respObj.hourly.temperature_2m[0]);
    
}

function displayWeather(temp) {
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    if(temp >= 30){
        var icon = "☀️";
        var description = "Sunny";    
    }else if(temp >= 20){
        var icon = "🌫";
        var description = "Nice";    
    }else{
        var icon = "🥶";
        var description = "Cold";    
    }
    const temperature = temp + "°C";

    weatherIcon.textContent = icon;
    weatherDescription.textContent = description;
    weatherTemperature.textContent = temperature;
}