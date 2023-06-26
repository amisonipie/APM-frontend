import moment from "moment";

export const dateFormat = (date, customFormat) => moment(date).format(customFormat || "DD-MM-YYYY") // Feb 13th 21
;

export const timeConvert = (n) => {
  const num = n;
  const hours = num / 60 / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return {
    hours: (`0${rhours}`).slice(1),
    minutes: (`0${rminutes}`).slice(1),
  };
};
