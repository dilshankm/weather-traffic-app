import React from "react";
import Container from "@mui/material/Container";
import Main from "./components";
import { StyledEngineProvider } from "@mui/material/styles";

const App = () => {
  return (
    <Container>
      <StyledEngineProvider injectFirst>
        <Main />
      </StyledEngineProvider>
    </Container>
  );
};

export default App;
