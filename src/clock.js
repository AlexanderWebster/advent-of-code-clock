import { clone, defaults } from "lodash-es";

const STANDARD_TIME_FORMAT = "12";

const TIME_DEFAULTS = {
  hourFormat: "24",
  precision: "seconds",
};

const leftPad = (number) => (number < 10 ? "0" + number : String(number));

const getTime = (options) => {
  options = setDefaults(options, TIME_DEFAULTS);

  let date = new Date();
  let hour = date.getHours();

  if (options.hourFormat == STANDARD_TIME_FORMAT) {
    let standardHour = hour % 12;
    if (standardHour === 0) standardHour = 12;
    hour = standardHour;
  }

  return {
    hours: leftPad(hour),
    minutes: leftPad(date.getMinutes()),
    seconds: leftPad(date.getSeconds()),
  };
};

const clock = (options) => {
  const { hours, minutes, seconds } = getTime(options);
  options = setDefaults(options, TIME_DEFAULTS);

  const h_m = hours + ":" + minutes;
  const h_m_s = hours + ":" + minutes + ":" + seconds;

  return options.precision == "minutes" ? h_m : h_m_s;
};

const setDefaults = (options, defaultz) =>
  defaults({}, clone(options), defaultz);

export { clock };
