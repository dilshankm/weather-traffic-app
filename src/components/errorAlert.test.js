import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorAlert from "./errorAlert";

describe("ErrorAlert", () => {
  it("renders the error message", () => {
    const testMessage = "Test error message";
    render(<ErrorAlert message={testMessage} />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
