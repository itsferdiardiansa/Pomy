export { default as screenDevice } from './screen'
export { default as formatDateTime } from './date'
export { default as debounce } from './debounce'
export { default as formatNumber } from './formatNumber'
export { default as types } from './typeof'

/**
 * Format currency
 *
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param string  s: sections delimiter
 * @param string  c: decimal delimiter
 */
export const formatCurrency = (val, n, x, s, c) => {
  let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = val.toFixed(Math.max(0, ~~n))

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || '.'))
}

/**
 * Collect id by from lists
 *
 * @param {Object} arr
 * @param {Object} lists
 * @param {String} keyname
 */
export const getIDByLists = (arr, lists, keyname = 'provider') => {
  return lists.map((item) => arr.includes(item[keyname]) && item.id).filter(Boolean)
}

/**
 * Find item on lists by value
 *
 * @param {Array} lists
 * @param any value
 * @param {String} keyname
 */
export const findItem = (lists, value, keyname) => {
  return lists.find((list) => list[keyname] === value)
}

/**
 * Copy text to clipboard
 *
 * @param {String} value
 * @param {Function} callback
 */
export const copyClipboard = (value, callback = () => {}) => {
  const makeCopy = (textToCopy) => {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(textToCopy)
    } else {
      let input = document.createElement('input')
      input.value = textToCopy
      input.style.position = 'fixed'
      input.style.left = '-999999px'
      input.style.top = '-999999px'
      document.body.appendChild(input)
      input.focus()
      input.select()

      return new Promise((res, rej) => {
        document.execCommand('copy') ? res() : rej()
        input.remove()
      })
    }
  }

  makeCopy(value).then(
    () => {
      callback()
    },
    (err) => {
      console.error('Async: Could not copy value: ', err)
    }
  )
}

/**
 * Truncate text
 *
 * @param {String} text
 * @param {Number} len
 */
export const truncateText = (text, len) => {
  let arrText, textLen

  if (text === null) return
  ;(arrText = text.split('')), (textLen = arrText.join('').length)
  for (let i = arrText.length; i > 0; i--) {
    let res = [].concat(arrText).splice(0, i).join('')

    if (res.length <= len) {
      res = arrText.splice(0, i)

      if (textLen > len) res.push('...')
      return res.join('')
    }
  }
}

/**
 * Create a loop from the givern numbers
 *
 * @param {Number} size
 */
export const range = (size) => [...Array(size).keys()]
