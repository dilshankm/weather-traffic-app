import { renderHook, waitFor } from "@testing-library/react";
import { getTraficImages } from "../services";
import trafficData from "../mock-data/trafficImages.json";
import useFetchTraficImages from "../hooks/useFetchTrafficImages";
import errorData from "../mock-data/errorData.json";

jest.mock("../services");

describe("useFetchTraficImages", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("fetches traffic images", async () => {
    getTraficImages.mockResolvedValue(trafficData);
    const { result } = renderHook(() =>
      useFetchTraficImages("2023-05-10", "08:00:00")
    );
    expect(result.current.traficImages).toBeUndefined();
    expect(result.current.errorT).toBeNull();
    await waitFor(() =>
      expect(result.current.traficImages).toEqual(trafficData)
    );
    expect(result.current.errorT).toBeNull();
  });

  it("handles error", async () => {
    getTraficImages.mockResolvedValue(errorData);
    const { result } = renderHook(() =>
      useFetchTraficImages("2023-05-10", "08:00:00")
    );
    expect(result.current.traficImages).toBeUndefined();
    expect(result.current.errorT).toBeNull();
    expect(result.current.traficImages).toBeUndefined();
  });
});
