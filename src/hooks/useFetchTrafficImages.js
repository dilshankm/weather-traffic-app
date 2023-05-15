import { useState, useEffect } from "react";
import { getTraficImages } from "../services";
import { setDateTime } from "../helpers";
import { isSuccessStatusCode } from "../helpers";

const useFetchTraficImages = (date, time) => {
  const [traficImages, setTraficImages] = useState();
  const [errorT, setErrorT] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      const dateTime = setDateTime(date, time).format("YYYY-MM-DD[T]HH:mm:ss");
      const data = await getTraficImages(dateTime);
      if(isSuccessStatusCode(data?.status)){
        setTraficImages(data);
      }
      else{
        setErrorT("Error in the service. Please contact Admin.");
      }
    })();
  }, [date, time]);

  return { traficImages, errorT };
};

export default useFetchTraficImages;
