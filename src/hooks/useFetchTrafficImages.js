import { useState, useEffect } from "react";
import { getTraficImages } from "../services";
import { setDateTime } from "../helpers";

const useFetchTraficImages = (date, time) => {
  const [traficImages, setTraficImages] = useState();
  const [loading, setLoading] = useState(false);
  const [errorT, setErrorT] = useState(null);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      setLoading(true);
      try {
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        const data = await getTraficImages(dateTime);
        setTraficImages(data);
        setLoading(false);
      } catch (error) {
        setErrorT(error.message);
        setLoading(false);
      }
    })();
  }, [date, time]);

  return { traficImages, loadingTraficImages: loading, errorT };
};

export default useFetchTraficImages;
