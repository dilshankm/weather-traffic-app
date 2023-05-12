import { useState, useEffect } from "react";
import { getTraficImages } from "../services";
import { setDateTime } from "../helpers";

const useFetchTraficImages = (date, time) => {
  const [traficImages, setTraficImages] = useState();
  const [errorT, setErrorT] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      try {
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        const data = await getTraficImages(dateTime);
        setTraficImages(data);
      } catch (error) {
        setErrorT(error.message);
      }
    })();
  }, [date, time]);

  return { traficImages, errorT };
};

export default useFetchTraficImages;
