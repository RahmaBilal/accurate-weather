const weatherCardsContainer = $("#weather-cards-container");

const API_KEY = "4ee1c276e740e7b3f94cf049482fb10e";
const getCurrentData = function (name, forecastData) {
  return {
    name: name,
    temperature: forecastData.current.temp,
    wind: forecastData.current.wind_speed,
    humidity: forecastData.current.humidity,
    uvi: forecastData.current.uvi,
    date: getFormattedDate(forecastData.current.dt, "- dddd - DD/MM/YYYY - HH:mm"),
    iconCode: forecastData.current.weather[0].icon,
  };
};

const getFormattedDate = function (unixTimestamp, format = "DD/MM/YYYY") {
    return moment.unix(unixTimestamp).format(format);
};

const getForecastData = function (forecastData) {
const callback = function (each) {
    return {
    date: getFormattedDate(each.dt),
    temperature: each.temp.max,
    wind: each.wind_speed,
    humidity: each.humidity,
    iconCode: each.weather[0].icon,
    };
};
  
return forecastData.daily.slice(1, 6).map(callback);
};

const getWeatherData = async (cityName) => {
const currentDataUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
const currentDataResponse = await fetch(currentDataUrl);
const currentData = await currentDataResponse.json();
  
const lat = currentData.coord.lat;
const lon = currentData.coord.lon;
const name = currentData.name;
  
const forecastDataUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  
const forecastDataResponse = await fetch(forecastDataUrl);
const forecastData = await forecastDataResponse.json();
  
const current = getCurrentData(name, forecastData);
const forecast = getForecastData(forecastData);
  
return {
    current: current,
    forecast: forecast,
};
};

const getUVIClassName = function (uvi) {
    if (uvi >= 0 && uvi < 3) {
      return "btn-success";
    } else if (uvi >= 3 && uvi < 6) {
      return "btn-warning";
    } else if (uvi >= 6 && uvi < 8) {
      return "btn-danger";
    } else {
      return "btn-dark";
    }
  };


const setCitiesInLS = function (cityName) {
    const cities = JSON.parse(localStorage.getItem("recentCities")) ?? [];
  
  if (!cities.includes(cityName)) {
      cities.push(cityName);
      localStorage.setItem("recentCities", JSON.stringify(cities));
    }
  };
