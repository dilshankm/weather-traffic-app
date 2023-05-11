import { render, fireEvent } from "@testing-library/react";
import Filters from "./filters";
import DatePicker from "./datePicker";
import TimePickerComponent from "./timePicker";

jest.mock('./DatePicker', () => (props) => <div data-testid="datepicker">{props.children}</div>);
jest.mock('./TimePicker', () => (props) => <div data-testid="timepicker">{props.children}</div>);

describe('Filters Component', () => {
  it.skip("renders without crashing", () => {
    render(<Filters />);
  });

  it.skip("renders DatePicker and TimePicker", () => {
    const { getByTestId } = render(<Filters />);

    expect(getByTestId("datepicker")).toBeInTheDocument();
    expect(getByTestId("timepicker")).toBeInTheDocument();
  });

  it.skip("onDateChange and onTimeChange callbacks are called", () => {
    const onDateChange = jest.fn();
    const onTimeChange = jest.fn();
    
    const { getByTestId } = render(
      <Filters onDateChange={onDateChange} onTimeChange={onTimeChange} />
    );
    
    fireEvent.change(getByTestId("datepicker"), { target: { value: "2023-05-10" } });
    expect(onDateChange).toHaveBeenCalled();

    fireEvent.change(getByTestId("timepicker"), { target: { value: "12:00" } });
    expect(onTimeChange).toHaveBeenCalled();
  });
});
