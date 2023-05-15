import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Filters from "./filters";
import { useFetchTraficImages, useFetchWeatherForecast } from "../hooks/index";
import LocationTable from "./locationTable";
import Slide from "./slide";
import Forecast from "./forecast";
import { setDateTime } from "../helpers";
import ErrorAlert from "./errorAlert";

const Main = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [dropState, setDropState] = useState();
  const [sliderState, setSliderState] = useState();
  const [weatherState, setWeatherState] = useState();
  let { traficImages, errorT } = useFetchTraficImages(date, time);
  const [disableClose, setDisableClose] = useState(null);
  let { weatherForecast, errorW } = useFetchWeatherForecast(date, time);
  const [selectedLocation, setSelectedLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [locationError, setLocationError] = useState(null);

  const onRowClickHandler = (data, name) => {
    name === undefined ? setWeatherState(false) : setWeatherState(true);
    setCurrentLocation(data);
    setSelectedLocation(name);
    if (traficImages && weatherForecast) {
      setSliderState(true);
    }
  };

  const manageStateChange = () => {
    if (!traficImages && !weatherForecast) {
      setDropState(true);
      setSliderState(false);
      setWeatherState(false);
    }
    if (traficImages && weatherForecast) {
      setDropState(true);
      setSliderState(false);
      setWeatherState(false);
    }
  };

  const onDateChange = (date) => {
    setDisableClose(null);
    setDropState(false);
    setSliderState(false);
    setWeatherState(false);
    if (!traficImages && !weatherForecast) {
      setDropState(true);
      setSliderState(false);
      setWeatherState(false);
    }
    setDate(date);
  };

  const onTimeChange = (time) => {
    setDisableClose(null);
    manageStateChange();
    setTime(time);
  };

  return (
    <>
      <Filters onDateChange={onDateChange} onTimeChange={onTimeChange} />

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid item xs={4} md={4} lg={4}>
          {dropState && traficImages && weatherForecast && !locationError ? (
            <LocationTable
              onSelect={onRowClickHandler}
              disableClose={disableClose}
              dateTime={setDateTime(date, time).format("YYYY-MM-DD[T]HH:mm:ss")}
              setLocationError={setLocationError}
            />
          ) : (
            locationError && <ErrorAlert message={locationError} />
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: 2 }}
      >
        <Grid item xs={8}>
          {sliderState && currentLocation && <Slide images={currentLocation} />}
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          {weatherState && (
            <Forecast
              weatherForecast={weatherForecast}
              currentLocation={currentLocation}
              selectedLocation={selectedLocation}
            ></Forecast>
          )}
        </Grid>
        <Grid item xs={4} md={4} lg={4}>
          {(errorW || errorT) && <ErrorAlert message={errorW || errorT} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
