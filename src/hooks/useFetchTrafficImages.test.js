import { renderHook } from "@testing-library/react";
import { getTraficImages } from "../services";
import { useFetchTraficImages } from "."
import { wait } from "@testing-library/user-event/dist/utils";
import traffic from "../mock-data/trafficImages.json"

jest.mock("../services");

describe("useFetchTraficImages", () => {
  it("fetches traffic images", async () => {
    const mockData = traffic;
    getTraficImages.mockResolvedValue(mockData);

    const { result } = renderHook(() =>
      useFetchTraficImages("2023-05-10", "08:00:00")
    );

    await wait(() => expect(result.current.loadingTraficImages).toBe(false));
    await wait(() => expect(result.current.traficImages).toBe(mockData));
    expect(result.current.traficImages).toEqual(mockData);
    expect(result.current.loadingTraficImages).toEqual(false);
  });
});
