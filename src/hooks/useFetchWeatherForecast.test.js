import { renderHook } from "@testing-library/react";
import { getWeatherForecast } from "../services";
import { useFetchWeatherForecast } from ".";
import { wait } from "@testing-library/user-event/dist/utils";
import weather from "../mock-data/weatherForecast.json";

jest.mock("../services");

describe("useFetchWeatherForecast", () => {
  it("fetches weather forecast", async () => {
    const mockData = weather;
    getWeatherForecast.mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useFetchWeatherForecast("2023-05-10", "08:00:00")
    );

    await wait(() => expect(result.current.loadingWeatherForecast).toBe(false));
    await wait(() => expect(result.current.weatherForecast).toBe(mockData));
    expect(result.current.weatherForecast).toEqual(mockData);
    expect(result.current.loadingWeatherForecast).toEqual(false);
  });
});
