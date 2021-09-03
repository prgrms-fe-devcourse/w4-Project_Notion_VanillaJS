const storage = window.localStorage
export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key)
    return storedValue
  } catch (e) {
    return defaultValue
  }
}
export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value))
}
export const removeItem = (key) => {
  storage.removeItem(key)
}
