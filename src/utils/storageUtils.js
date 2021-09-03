const getStorage = () => window.localStorage;

const setItem = (key, value) => {
  try {
    getStorage().setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const getItem = (key, defaultValue) => {
  try {
    const storedValue = getStorage().getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const storageUtils = {
  setItem,
  getItem,
};
