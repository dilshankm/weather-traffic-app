import { renderHook, waitFor } from "@testing-library/react";
import { getWeatherForecast } from "../services";
import useFetchWeatherForecast from "./useFetchWeatherForecast";
import weatherData from "../mock-data/weatherForecast.json";
import errorData from "../mock-data/errorData.json";

jest.mock("../services");

describe("useFetchWeatherForecast", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches weather forecast", async () => {
    getWeatherForecast.mockResolvedValue(weatherData);
    const { result } = renderHook(() =>
      useFetchWeatherForecast("2023-05-10", "08:00:00")
    );
    expect(result.current.weatherForecast).toBeUndefined();
    expect(result.current.errorW).toBeNull();
    await waitFor(() =>
      expect(result.current.weatherForecast).toEqual(weatherData)
    );
    expect(result.current.errorW).toBeNull();
  });

  it("handles error", async () => {
    getWeatherForecast.mockResolvedValue(errorData);
    const { result } = renderHook(() =>
      useFetchWeatherForecast("2023-05-10", "08:00:000")
    );
    expect(result.current.weatherForecast).toBeUndefined();
    expect(result.current.errorW).toBeNull();
  });
});
