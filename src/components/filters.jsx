import React from "react";

import Grid from "@mui/material/Grid";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";

const Filters = ({ onDateChange, onTimeChange }) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      sx={{ mt: 2 }}
    >
      <Grid item xs={4} md={4} lg={4}>
        <DatePicker onDateChange={onDateChange} />
      </Grid>
      <Grid item xs={4} md={4} lg={4}>
        <TimePicker onTimeChange={onTimeChange} />
      </Grid>
      <Grid item xs={4} md={4} lg={4}></Grid>
    </Grid>
  );
};

export default Filters;
