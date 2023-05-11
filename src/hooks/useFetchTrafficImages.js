import { useState, useEffect } from "react";
import { getTraficImages } from "../services";
import { setDateTime } from "../helpers";

const useFetchTraficImages = (date, time) => {

  const [traficImages, setTraficImages] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!date || !time) return;
      setLoading(true);
      try {
        console.log(date)
        console.log(time)
        const dateTime = setDateTime(date, time).format(
          "YYYY-MM-DD[T]HH:mm:ss"
        );
        console.log('Be')
        console.log(dateTime);
        const data = await getTraficImages(dateTime);
        setTraficImages(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error)
      }
    })();
  }, [date, time]);

  return { traficImages, loadingTraficImages: loading };
};

export default useFetchTraficImages;
