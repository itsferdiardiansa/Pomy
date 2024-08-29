const debounce = (
  func: (params: unknown) => void,
  wait?: number,
  immediate?: boolean
) => {
  let timeout, args, context, timestamp, result
  if (null == wait) wait = 100

  const later = function () {
    const last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  const debounced = function () {
    context = this
    args = arguments
    timestamp = Date.now()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, ...args)
      context = args = null
    }

    return result
  }

  debounced.clear = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  debounced.flush = () => {
    if (timeout) {
      result = func.apply(context, args)
      context = args = null

      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced
}

export default debounce
