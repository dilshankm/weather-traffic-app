import * as React from "react";
import { useState, useEffect } from "react";
import Search from "./locationSearch";
import { getLocationMap } from "../services";
import { isSuccessStatusCode } from "../helpers";

const LocationTable = ({
  onSelect,
  disableClose,
  dateTime,
  setLocationError,
}) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const fetchLocationMap = async () => {
      const locationMap = await getLocationMap(dateTime);
      if (isSuccessStatusCode(locationMap?.status)) {
        setOptions(locationMap);
      } else {
        setLocationError("Error in the service. Please contact Admin.");
      }
    };

    fetchLocationMap();
  }, [dateTime, setLocationError]);

  const handleSelect = (event) => {
    const selectedLocationName = event.target.outerText;
    const selectedDirections = options[selectedLocationName];
    onSelect(selectedDirections, selectedLocationName);
  };

  return (
    <>
      <Search
        data={options ? Object.keys(options) : []}
        onSelect={handleSelect}
        disableClose={disableClose}
      />
    </>
  );
};

export default LocationTable;
