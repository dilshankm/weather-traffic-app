import dayjs from "dayjs";

export const setDateTime = (date, time) =>
  date &&
  time &&
  dayjs(date).set("hour", time.$H).set("minute", time.$m).set("second", "00");

export const isSuccessStatusCode = (statusCode) => {
  return statusCode === undefined ? true : false;
};
