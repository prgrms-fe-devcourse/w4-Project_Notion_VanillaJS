export const isArrayValid = (state) => {
  if (state && Array.isArray(state)) {
    return true
  } else {
    throw new Error('array validation 오류!')
  }
}

export const isObjectValid = (state) => {
  if (state && state.constructor === Object) {
    return true
  } else {
    throw new Error('object validation 오류!')
  }
}
