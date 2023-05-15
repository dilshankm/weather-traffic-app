import { useState, useEffect } from "react";
import { getWeatherForecast } from "../services";
import { setDateTime } from "../helpers";
import { isSuccessStatusCode } from "../helpers";

const useFetchWeatherForecast = (date, time) => {
  const [weatherForecast, setWeatherForecast] = useState();
  const [errorW, setErrorW] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        const data = await getWeatherForecast(dateTime);
        if(isSuccessStatusCode(data?.status)){
          setWeatherForecast(data);
        }
        else{
          setErrorW("Error in the service. Please contact Admin.");
        }
    })();
  }, [date, time]);

  return { weatherForecast, errorW };
};

export default useFetchWeatherForecast;
