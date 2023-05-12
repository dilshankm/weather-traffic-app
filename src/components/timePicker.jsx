import React from "react";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const TimePickerComponent = ({ onTimeChange }) => {
  const handleChange = (data) => {
    onTimeChange(data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Select a time"
        id="time"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
        sx={{ width: 250 }}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
