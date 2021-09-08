export const debounce = (callback, delay) => {
  let timer = null

  return (...args) => {
    const later = () => {
      clearTimeout(timer)
      callback(...args)
    }

    clearTimeout(timer)
    timer = setTimeout(later, delay)
  }
}
