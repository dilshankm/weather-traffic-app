import React from "react";
import { render, screen } from "@testing-library/react";
import Forecast from "./forecast";
import "@testing-library/jest-dom";

describe("Forecast component", () => {
  it("renders without crashing", () => {
    const props = {
      weatherForecast: {
        items: [
          {
            forecasts: [{ area: "TestLocation", forecast: "Sunny" }],
          },
        ],
      },
      currentLocation: "TestLocation",
      selectedLocation: "TestLocation",
    };

    render(<Forecast {...props} />);
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });

  it("does not render forecast if not available", () => {
    const props = {
      weatherForecast: {
        items: [],
      },
      currentLocation: "TestLocation",
      selectedLocation: "TestLocation",
    };

    render(<Forecast {...props} />);
    expect(screen.queryByText("Sunny")).not.toBeInTheDocument();
  });
});
