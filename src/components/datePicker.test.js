import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import DatePicker from "./datePicker";

jest.mock("@mui/x-date-pickers/desktopDatePicker");

describe("DatePicker", () => {
  it.skip("should call onDateChange with the selected date", async () => {
    const onDateChange = jest.fn();
    const { getByLabelText } = render(
      <DatePicker onDateChange={onDateChange} />
    );
    const input = getByLabelText("Pick a date");

    await act(async () => {
      fireEvent.change(input, { target: { value: "2023-05-10" } });
    });

    expect(onDateChange).toHaveBeenCalledWith("2023-05-10");
  });
});
