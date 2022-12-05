/**
 * @worklet
 */
export function formatDatetime({
  value,
  locale = 'en-US',
  options = {},
  trustee
}) {
  'worklet';

  const d = new Date(value);

  if (trustee) {
    const getMonth = (date, short = false) => {
      let month = date.getMonth();
      month += 1;
      return month < 10 ? '0' + month : month;
    };

    const getNumberDay = date => {
      const day = date.getDate();
      return day < 10 ? '0' + day : day;
    };

    const getHours = date => {
      const hours = date.getHours();
      return hours < 10 ? '0' + hours : hours;
    };

    const getMinutes = date => {
      const minutes = date.getMinutes();
      return minutes < 10 ? '0' + minutes : minutes;
    };

    const numberDay = getNumberDay(d);
    const numberMonth = getMonth(d);
    const fullYear = d.getFullYear();
    const shortYear = fullYear.toString().slice(-2);
    const hours = getHours(d);
    const minutes = getMinutes(d);

    if (locale === 'en') {
      return `${hours}:${minutes}, ${numberDay}.${numberMonth}.${shortYear}`;
    }

    return `${hours}:${minutes}, ${numberMonth}.${numberDay}.${shortYear}`;
  }

  return d.toLocaleString(locale, options);
}
//# sourceMappingURL=formatDatetime.js.map