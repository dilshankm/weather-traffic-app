import axios from "axios";
import { getTraficImages, getWeatherForecast } from ".";

jest.mock("axios");

describe("API tests", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it("fetches traffic images", async () => {
    const mockData = { data: "fake data" };
    axios.get.mockResolvedValue(mockData);

    const result = await getTraficImages("2023-05-10T08:00:00");
    expect(result).toEqual("fake data");
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.data.gov.sg/v1/transport/traffic-images?date_time=2023-05-10T08:00:00"
    );
  });

  it("fetches weather forecast", async () => {
    const mockData = { data: "fake data" };
    axios.get.mockResolvedValue(mockData);

    const result = await getWeatherForecast("2023-05-10T08:00:00");
    expect(result).toEqual("fake data");
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=2023-05-10T08:00:00"
    );
  });
});
