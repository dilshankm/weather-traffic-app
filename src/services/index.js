import axios from "axios";

export const getTraficImages = async (dateTime) => {
  const url = `https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateTime}`;
  const results = await axios.get(url);
  return results.data;
};

export const getWeatherForecast = async (dateTime) => {
  const url = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateTime}`;
  const results = await axios.get(url);
  return results.data;
};
