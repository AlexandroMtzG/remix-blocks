import moment from "moment";

const dateAgo = (value: Date | string | null | undefined): string => {
  const today = moment(new Date());
  const at = moment(value);
  const days = Math.abs(today.diff(at, "days"));
  // if (unitOfTime) {
  //   return moment(at)
  //     .startOf(unitOfTime)
  //     .fromNow();
  // }
  if (days <= 1) {
    return moment(at).startOf("minute").fromNow();
  } else if (days <= 7) {
    return moment(at).startOf("day").fromNow();
  } else if (days <= 30) {
    return moment(at).startOf("week").fromNow();
  } else if (days <= 30 * 12) {
    return moment(at).startOf("month").fromNow();
  } else if (days <= 30 * 12 * 2) {
    return moment(at).startOf("year").fromNow();
  } else {
    return moment(at).format("YYYY-MM-DD");
  }
};
const dateYMD = (value: Date | string | null | undefined): string => {
  return moment(value).format("YYYY-MM-DD");
};
const dateLL = (value: Date | string | null | undefined): string => {
  return moment(value).format("YYYY-MM-DD");
};
const dateYMDHMS = (value: Date | string | null | undefined): string => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
};
const dateMonthName = (value: Date | string | null | undefined): string => {
  return moment(value).format("MMMM YYYY");
};
const dateDM = (value: Date | string | null | undefined): string => {
  return moment(value).format("D MMM");
};
const dateMonthDayYear = (value: Date | string | null | undefined): string => {
  return moment(value).format("MMMM D, YYYY");
};
const dateHMS = (value: Date | string | null | undefined): string => {
  return moment(value).format("HH:mm:ss");
};

const daysFromDate = (value: Date, days: number) => {
  return new Date(new Date().setDate(value.getDate() + days));
};

export default {
  dateAgo,
  dateYMD,
  dateLL,
  dateYMDHMS,
  dateMonthName,
  dateDM,
  dateHMS,
  dateMonthDayYear,
  daysFromDate,
};
