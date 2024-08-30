export const snakeToTitle = (text) => {
  return text.split('_').join(' ')
}

export const camelToTitle = (text) => {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
}
