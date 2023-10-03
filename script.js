const timeEl = document.getElementById('time');
const tempEl = document.getElementById('temp');
const iconEl = document.getElementById('icon');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const currentWeatherIconsEl = document.getElementById('current-weather-icons');
const desEl = document.getElementById('description');
const imageEl = document.getElementsByClassName("icon");



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;
        console.log(success);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=aa1f6ac8ed6414605c986f99045cb6df
        `).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        console.log(data.weather[0].main)
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, feels_like} = data.main;
    let {sunrise, sunset, country} = data.sys;
    let {speed} = data.wind;
    let {main, icon} = data.weather[0];
    desEl.innerHTML = main;
    timezone.innerHTML = data.name;
    countryEl.innerHTML = country;
    tempEl.innerHTML = Math.round(feels_like);
    document.getElementById("icon").src = `http://openweathermap.org/img/wn//${icon}@2x.png`;
    

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;
}