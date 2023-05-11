import '../__mocks__/matchMedia.mock';
import React from 'react';
import { render } from "@testing-library/react";
import Main from ".";

it("renders without crashing", () => {
  render(<Main />);
});
