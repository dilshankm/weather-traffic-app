import { useState, useEffect } from "react";
import { getWeatherForecast } from "../services";
import { setDateTime } from "../helpers";

const useFetchWeatherForecast = (date, time) => {
  const [weatherForecast, setWeatherForecast] = useState();
  const [loading, setLoading] = useState(false);
  const [errorW, setErrorW] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      setLoading(true);
      try {
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        const data = await getWeatherForecast(dateTime);
        setWeatherForecast(data);
        setLoading(false);
      } catch (error) {
        setErrorW(error.message);
        setLoading(false);
      }
    })();
  }, [date, time]);

  return { weatherForecast, loadingWeatherForecast: loading, errorW };
};

export default useFetchWeatherForecast;
