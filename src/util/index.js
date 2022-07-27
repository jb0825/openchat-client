/**
 * Object Empty Check
 * @param {object}
 * @returns {boolean}
 */
export const isEmpty = (object) => (Object.keys(object).length === 0 ? true : false);

export const dateToHoursAndMinutes = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isMorning = hours <= 12;

  return `${isMorning ? "오전" : "오후"} ${isMorning ? hours : hours - 12} : ${minutes < 10 ? "0" + minutes : minutes}`;
};

export const dateToYears = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};

export const dateToYears_Ko = (date) => {
  const dateArr = dateToYears(date).split(".");
  return `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`;
};
