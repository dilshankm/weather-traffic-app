import { setDateTime } from ".";

describe("setDateTime", () => {
  it("returns the correct date and time", () => {
    const date = "2023-05-10";
    const time = {
      $H: 11,
      $m: 11,
    };
    const result = setDateTime(date, time);
    expect(result.format("YYYY-MM-DD[T]HH:mm:ss")).toEqual(
      "2023-05-10T11:11:00"
    );
  });

  it("returns null if either date or time is not provided", () => {
    const date = "2023-05-10";
    const time = null;
    const result = setDateTime(date, time);
    expect(result).toBeNull();
  });
});
