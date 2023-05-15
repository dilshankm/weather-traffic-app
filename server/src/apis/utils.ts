import dayjs from "dayjs";

export const getNearestLocation = (latitude, longitude, locations) => {
  // Haversine formula to calculate distance between two points
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };
  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  let minDist = Infinity;
  let closestLocation = null;
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const dist = getDistance(
      latitude,
      longitude,
      location.latitude,
      location.longitude
    );
    if (dist < minDist) {
      minDist = dist;
      closestLocation = location;
    }
  }
  return closestLocation;
};

export const getTraficLocation = (lat, long, weatherForecast) => {
    const location = weatherForecast?.area_metadata?.map((item) => ({
      name: item?.name,
      latitude: item?.label_location?.latitude,
      longitude: item?.label_location?.longitude,
    }));
  
    const matchedLocation = location?.find(
      (item) => item.latitude === lat && item.longitude === long
    );
  
    return matchedLocation
      ? matchedLocation.name
      : getNearestLocation(lat, long, location)?.name || "";
  };
  
  export const getOptions = (traficImages, weatherForecast) => {
    const options = traficImages?.items[0]?.cameras?.map((item, index) => {
      const location = getTraficLocation(
        item?.location?.latitude,
        item?.location?.longitude,
        weatherForecast
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
  