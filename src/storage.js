const storage = window.localStorage

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : defaultValue
  } catch(e) {
    console.log(e)
    return defaultValue
  }
}

export const setItem = (key, value) => {
  console.log(key, value)
  storage.setItem(key, JSON.stringify(value))
}

export const removeItem = (key) => {
  storage.removeItem(key)
}