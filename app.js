const api  = {
    key: "9201f7e417eedd638e56c90d6e383c5c",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }


}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults (weather) {
    console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp  = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.floor(weather.main.temp)}<span>°c</span>`

    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText = weather.weather[0].description;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.floor(weather.main.temp_min)}°c / ${Math.floor(weather.main.temp_max)}°c`
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;

}