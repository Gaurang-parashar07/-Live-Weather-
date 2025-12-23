// const apikey = "a61acc0ea485e854e1bb01b4adff661b";
// const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=&lon=";

// const searchbox = document.querySelector(".search input");
// const searchbtn = document.querySelector(".search svg")

// async function checkweather(city){
//     const response = await fetch(`${apiurl}${city}&appid=${apikey}` );

//     var data = await response.json();

//     console.log(data); 

//     document.querySelector(".city").innerHTML = data.name;
//     document.querySelector(".temp").innerHTML = Math.round(data.main.temp )+ "°C ";
//     document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector(".Wind").innerHTML = data.wind.speed + "km/h";
// }
// searchbtn.addEventListener("click",()=>{
//     checkweather(searchbox.value);  
// })

// searchbox.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") {
//         checkweather(searchbox.value);
//     }
// });


const apikey = "a61acc0ea485e854e1bb01b4adff661b";

async function getCoordinates(city) {
    const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
    const response = await fetch(geoURL);
    const data = await response.json();

    if (data.length === 0) {
        alert("City not found");
        return null;
    }

    return {
        lat: data[0].lat,
        lon: data[0].lon
    };
}

async function checkweather(lat, lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
    const response = await fetch(weatherURL);
    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weathericon.src = "icons8-cloud-94.png"
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src = "weather.png"
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src = "rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "rainy-day_9342323.png"
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src = "mist_13882373.png"
    }
    else if(data.weather[0].main == "Hot"){
        weathericon.src = "hot.png"
    } 
}


const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search svg");
const weathericon = document.querySelector(".weather-icon")

searchbtn.addEventListener("click", async () => {
    const city = searchbox.value;
    const coords = await getCoordinates(city);
    if (coords) {
        checkweather(coords.lat, coords.lon);
    }
});


searchbox.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        const city = searchbox.value;
        const coords = await getCoordinates(city);
        if (coords) {
            checkweather(coords.lat, coords.lon);
        }
    }
});


