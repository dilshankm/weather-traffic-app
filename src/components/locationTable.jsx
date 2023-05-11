import * as React from "react";
import { getNearestLocation } from "../helpers";
import Search from "./locationSearch";

const LocationTable = ({
  weatherForecast,
  traficImages,
  onSelect,
  disableClose,
}) => {
  const getTraficLocation = (lat, long) => {
    const location = weatherForecast?.area_metadata?.map((item) => ({
      name: item?.name,
      latitude: item?.label_location?.latitude,
      longitude: item?.label_location?.longitude,
    }));
    const nearestLocation = getNearestLocation(lat, long, location);
    return nearestLocation?.name || "";
  };

  const getOptions = () => {
    const options = traficImages?.items[0]?.cameras?.map((item, index) => {
      const location = getTraficLocation(
        item?.location?.latitude,
        item?.location?.longitude
      );
      return { location_name: location, directions: item };
    });

    const map1 = new Map();
    options.forEach((element) => {
      if (map1.get(element.location_name)) {
        map1.set(element.location_name, [
          ...map1.get(element.location_name),
          element.directions,
        ]);
      } else {
        map1.set(element.location_name, [element.directions]);
      }
    });
    return map1;
  };

  return (
    <>
      <Search
        data={Array.from(getOptions().keys())}
        onSelect={(event) =>
          onSelect(
            getOptions().get(event.target.outerText),
            event.target.outerText
          )
        }
        disableClose={disableClose}
      />
    </>
  );
};

export default LocationTable;
