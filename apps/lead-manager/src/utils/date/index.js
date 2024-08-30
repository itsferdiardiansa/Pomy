/* eslint-disable */
/**
 * Format date and time
 *
 * @param value {String}
 * @param formatReturn {String}
 * @param defaultLang {String}
 *
 * @return String
 */
export default (value, formatReturn, defaultLang = 'en') => {
  const lang = require(`./lang/${defaultLang}`).default
  const months = lang.months.split('_')
  const shortMonths = months.map((item, id) =>
    id == 7 && defaultLang == 'id' ? 'Ags' : item.substring(0, 3)
  )
  const initialDate = new Date(value.replace(/-/g, '/'))
  const [day, date, month, year, hours, minutes, seconds] = [
    initialDate.getDay(),
    initialDate.getDate(),
    initialDate.getMonth(),
    initialDate.getFullYear(),
    initialDate.getHours(),
    initialDate.getMinutes(),
    initialDate.getSeconds()
  ]
  const getMonth = months[month]
  const getShortMonth = shortMonths[month]
  const getMinutes = minutes < 10 ? `0${minutes}` : minutes
  const getSeconds = seconds < 10 ? `0${seconds}` : seconds
  const symbolsPattern = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g
  const rulesPattern = /(MMM?M)|(DD)|(YYYY)|(hh)|(mm)|(ss)/g
  const rules = {
    YYYY: 'year',
    MMM: 'getShortMonth',
    MMMM: 'getMonth',
    DD: 'date',
    hh: 'hours',
    mm: 'getMinutes',
    ss: 'getSeconds'
  }
  let result = []
  const sformatReturn = formatReturn.split(rulesPattern).filter(Boolean)

  const isSymbol = (val) => {
    return val.search(symbolsPattern)
  }

  for (let i of sformatReturn) {
    if (Reflect.has(rules, i)) result.push(eval(rules[i]))
    else result.push(i)
  }

  return result.join('')
}
