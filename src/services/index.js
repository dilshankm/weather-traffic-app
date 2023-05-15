import axios from "axios";

export const getTraficImages = async (dateTime) => {
  const url = `http://localhost:4000/apis/traffic-images?date_time=${dateTime}`;
  const results = await axios.get(url);
  return results.data;
};

export const getWeatherForecast = async (dateTime) => {
  const url = `http://localhost:4000/apis/weather-forecast?date_time=${dateTime}`;
  const results = await axios.get(url);
  return results.data;
};

export const getLocationMap = async (dateTime) => {
  const url = `http://localhost:4000/apis/location-map?date_time=${dateTime}`;
  const results = await axios.get(url);
  return results.data;
};
