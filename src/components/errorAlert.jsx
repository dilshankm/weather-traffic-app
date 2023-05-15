import React from "react";
import { Alert } from "@mui/material";

const ErrorAlert = ({ message }) => {
  return (
    <Alert severity="error" variant="filled">
      {message}
    </Alert>
  );
};

export default ErrorAlert;
