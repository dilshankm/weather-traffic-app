import React from "react";
import { Item } from "./styled";
import Typography from "@mui/material/Typography";

const Forecast = ({ weatherForecast, currentLocation, selectedLocation }) => {

  const getForeCaset = () =>
    weatherForecast?.items?.[0]?.forecasts?.filter(
      (item) => item.area === selectedLocation
    );
  return (
    <Item>
      <Typography color="black" fontWeight={600}>
        {getForeCaset()?.[0]?.forecast}
      </Typography>
    </Item>
  );
};

export default Forecast;
