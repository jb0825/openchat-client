/**
 * Object Empty Check
 * @param {object}
 * @returns {boolean}
 */
export const isEmpty = (object) => (Object.keys(object).length === 0 ? true : false);

/**
 * date to "AM 00:00" string
 * @param {date}
 * @returns {string}
 */
export const dateToHoursAndMinutes = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isMorning = hours <= 12;

  return `${isMorning ? "오전" : "오후"} ${isMorning ? hours : hours - 12} : ${minutes < 10 ? "0" + minutes : minutes}`;
};

/**
 * date to "0000.00.00" string
 * @param {date}
 * @returns {string}
 */
export const dateToYears = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};

/**
 * date to "0000년 00월 00일" string
 * @param {date}
 * @returns {string}
 */
export const dateToYears_Ko = (date) => {
  const dateArr = dateToYears(date).split(".");
  return `${dateArr[0]}년 ${dateArr[1]}월 ${dateArr[2]}일`;
};
