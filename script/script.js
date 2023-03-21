const API = "036dd13ed1984e97a0afff5415a96c35";
const mainCont = document.querySelector('.main-Cont');
const inputeInfo = document.querySelector('.inpute-Info');
const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
console.log(API);
let temperature;
let image;
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
    const data = await response.json();
    temperature = Math.round(data.main.temp);
    image = '<img src="http://openweathermap.org/img/wn/' + data.weather[0]['icon'] + '@2x.png">';
    localStorage.setItem(city, temperature);
    setTimeout(() => {
        localStorage.clear();
    }, 2 * 60 * 60 * 1000);
    return data;
}
function displayInfo(mainInfo) {
    mainInfo.forEach(city => {
        const infoName = document.createElement('p')
        const infoTemp = document.createElement('p')
        const infoImage = document.createElement('p')
        const infoWeather=document.createElement('div')
        infoName.innerText =city.name;
        infoTemp.innerText ="Температура "+ city.main.temp;
        infoImage.innerHTML = '<img src="http://openweathermap.org/img/wn/' + city.weather[0]['icon'] + '@2x.png">';
        infoWeather.innerText="Небо буде "+ city.weather[0].description;
        result.appendChild(infoName);
        result.appendChild(infoTemp);
        result.appendChild(infoImage);
        result.appendChild(infoWeather);

    })
}
async function displayWeather() {
    result.innerHTML = '';
    const city = (inputeInfo.value).trim();
    const infoData = await getWeather(city);
    displayInfo([infoData])
};
btn.addEventListener('click', displayWeather);

