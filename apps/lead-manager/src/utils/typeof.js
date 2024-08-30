const dataType = {
  isBoolean: (value) => typeof value === 'boolean',
  isObject: (value) => value === 'object',
  isArray: (value) => Array.isArray(value),
  isFunction: (value) => typeof value === 'function',
  isNumber: (value) => typeof value === 'number',
  isString: (value) => typeof value === 'string',
  isFloat: (value) => Number(value) === value && value % 1 !== 0
}

export default dataType
