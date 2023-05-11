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

export const setDateTime = (date, time) =>
  date &&
  time &&
  dayjs(date).set("hour", time.$H).set("minute", time.$m).set("second", "00");
