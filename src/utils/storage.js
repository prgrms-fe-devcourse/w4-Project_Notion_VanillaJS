const storage = window.localStorage

const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch(e) {
    console.error(e)
  }
}

const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key)

    if (!storedValue) {
      return defaultValue
    }
    return JSON.parse(storedValue)

  } catch(e) {
    return defaultValue
  }
}

const removeItem = (key) => {
  try {
    storage.removeItem(key)
  } catch(e) {
    console.error(e)
  }
}

export const StorageUtils = {
  setItem,
  getItem,
  removeItem
}