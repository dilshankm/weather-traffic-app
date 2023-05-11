import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Main from "./components";
import '@testing-library/jest-dom';


jest.mock("./components", () => () => <div data-testid="main-component" />);

describe("App Component", () => {
  it("renders App component", () => {
    render(<App />);
  });

  test("renders Main component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("main-component")).toBeInTheDocument();
  });
});

