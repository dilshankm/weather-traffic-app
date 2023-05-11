import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TimePickerComponent from "./timePicker";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/react";

describe("TimePickerComponent", () => {
  it("renders without crashing", () => {
    const mockOnTimeChange = jest.fn();
    render(<TimePickerComponent onTimeChange={mockOnTimeChange} />);
    expect(screen.getByLabelText("Select a time")).toBeInTheDocument();
  });

  it.skip("calls onTimeChange when time is changed", async () => {
    const mockOnTimeChange = jest.fn();
    render(<TimePickerComponent onTimeChange={mockOnTimeChange} />);
    fireEvent.change(screen.getByLabelText("Select a time"), "12:00");
    await waitFor(() => {
      expect(mockOnTimeChange).toHaveBeenCalledWith("12:00");
    });
  });
});
