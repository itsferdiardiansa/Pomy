export default {
  /**
   * Credit Card Format
   *
   * @param {String} value
   */
  creditCard: (value) => {
    const v = value?.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    let parts = []

    // console.log(value)
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    return parts.length ? parts.join(' ') : value
  }
}
