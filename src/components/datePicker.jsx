  import React, { useState } from "react";
  import TextField from '@mui/material/TextField';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

  const DatePicker = ({ onDateChange }) => {

    const [dateTime, setValue] = useState(null);

    const handleChange = (event) => {
      setValue(event);
      onDateChange(event);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label = "Pick a date"
          disableFuture
          value={dateTime}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Pick a date"/>}
          sx={{width: '100%'}}
        />
      </LocalizationProvider>
    );
  };

  export default DatePicker;
