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

