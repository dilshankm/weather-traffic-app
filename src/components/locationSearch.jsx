import React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Search = ({ data, onSelect, disableClose }) => {
  return (
    <>
      <Autocomplete
        id="locations"
        options={data}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select a City" />
        )}
        onChange={onSelect}
      />
    </>
  );
};

export default Search;
