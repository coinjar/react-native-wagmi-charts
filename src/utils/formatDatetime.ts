/**
 * @worklet
 */
export function formatDatetime({
  value,
  locale = 'en-US',
  options = {},
  trustee
}: {
  value: number;
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  trustee?: string;
}) {
  'worklet';
  const d = new Date(value);

  if (trustee) {
    const getMonth = (date: any, short:any = false) => {
        let month = date.getMonth()
        month += 1
        return month < 10 ? '0' + month : month
    }
    
    const getNumberDay = (date:any) => {
        const day = date.getDate()
        return day < 10 ? '0' + day : day
    }
    
    const getHours = (date:any) => {
        const hours = date.getHours()
        return hours < 10 ? '0' + hours : hours
    }
    
    const getMinutes = (date:any) => {
        const minutes = date.getMinutes()
        return minutes < 10 ? '0' + minutes : minutes
    }

    const numberDay = getNumberDay(d)
    const numberMonth = getMonth(d)
    const fullYear = d.getFullYear()
    const shortYear = fullYear.toString().slice(-2)
    const hours = getHours(d)
    const minutes = getMinutes(d)

    if (locale !== 'en') {
      return `${hours}:${minutes}, ${numberDay}.${numberMonth}.${shortYear}`
    }
    return `${hours}:${minutes}, ${numberMonth}.${numberDay}.${shortYear}`
  }

  return d.toLocaleString(locale, options);
}
