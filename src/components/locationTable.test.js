import { render, fireEvent, screen } from "@testing-library/react";
import LocationTable from "./locationTable";
import { getNearestLocation } from "../helpers";
import Search from "./locationSearch";
import React from "react";
import weather from "../mock-data/weatherForecast.json";
import traffic from "../mock-data/trafficImages.json";
import '@testing-library/jest-dom';

jest.mock("../helpers", () => ({
  getNearestLocation: jest.fn(),
}));

jest.mock("./locationSearch", () => (props) => (
    <div data-testid="mock-search">
      <button onClick={() => props.onSelect({ target: { outerText: "testLocation" }})}>Select location</button>
    </div>
  ));
  

describe("LocationTable component", () => {
  it("renders without crashing", () => {
    const props = {
      weatherForecast: weather,
      traficImages: traffic,
      onSelect: jest.fn(),
      disableClose: true,
    };
    render(<LocationTable {...props} />);
    expect(screen.getByTestId("mock-search")).toBeInTheDocument();
  });

  it.skip("calls onSelect when a location is selected", () => {
    const onSelectMock = jest.fn();
    const props = {
      weatherForecast: weather,
      traficImages: traffic,
      onSelect: onSelectMock,
      disableClose: true,
    };
    
    render(<LocationTable {...props} />);
    fireEvent.click(screen.getByText(/select location/i));
    expect(onSelectMock).toHaveBeenCalledWith(expect.objectContaining({ target: { outerText: 'testLocation' }}));
  });
  

  it.skip("returns traffic location", () => {
    const props = {
      weatherForecast: {
        area_metadata: [
          {
            name: "Test Location",
            label_location: { latitude: "1.1", longitude: "1.1" },
          },
        ],
      },
      traficImages: {
        items: [
          {
            cameras: [
              { location: { latitude: "1.1", longitude: "1.1" } },
            ],
          },
        ],
      },
      onSelect: jest.fn(),
      disableClose: true,
    };
    getNearestLocation.mockReturnValue({
      name: "Test Location",
      latitude: "1.1",
      longitude: "1.1",
    });

    render(<LocationTable {...props} />);
    fireEvent.click(screen.getByText(/select location/i));
    expect(getNearestLocation).toHaveBeenCalled();
  });
});
