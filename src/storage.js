const storage = window.sessionStorage;

export const getItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.log(e.message);
  }
  return defaultValue;
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};
