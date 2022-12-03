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
