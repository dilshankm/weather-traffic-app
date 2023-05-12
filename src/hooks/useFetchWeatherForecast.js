import { useState, useEffect } from "react";
import { getWeatherForecast } from "../services";
import { setDateTime } from "../helpers";

const useFetchWeatherForecast = (date, time) => {
  const [weatherForecast, setWeatherForecast] = useState();
  const [errorW, setErrorW] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      try {
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        const data = await getWeatherForecast(dateTime);
        setWeatherForecast(data);
      } catch (error) {
        setErrorW(error.message);
      }
    })();
  }, [date, time]);

  return { weatherForecast, errorW };
};

export default useFetchWeatherForecast;
