const storage = window.localStorage

export const getItem = (key, defaultValue) => {
  try {
    const savedValue = storage.getItem(key)
    return savedValue ? JSON.parse(savedValue) : defaultValue
  } catch (e) {
    console.log('getItem 오류')
    return defaultValue
  }
}

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log('setItem 오류!')
  }
}

export const removeItem = (key) => {
  try {
    storage.removeItem(key)
  } catch (e) {
    console.log('removeItem 오류!')
  }
}
