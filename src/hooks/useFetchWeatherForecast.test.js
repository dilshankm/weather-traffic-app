import { renderHook, waitFor } from "@testing-library/react";
import { getWeatherForecast } from "../services";
import useFetchWeatherForecast from "./useFetchWeatherForecast";
import weatherData from "../mock-data/weatherForecast.json";

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
    const mockError = new Error("Network error");
    getWeatherForecast.mockRejectedValue(mockError);
    const { result } = renderHook(() =>
      useFetchWeatherForecast("2023-05-10", "08:00:00")
    );
    expect(result.current.weatherForecast).toBeUndefined();
    expect(result.current.errorW).toBeNull();
    await waitFor(() =>
      expect(result.current.errorW).toEqual(mockError.message)
    );
    expect(result.current.weatherForecast).toBeUndefined();
  });
});
