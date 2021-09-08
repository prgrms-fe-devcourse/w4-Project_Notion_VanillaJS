const storage = window.localStorage;

export const getItem = (key) => {
  return storage.getItem(key);
};

export const setItem = (key, value) => {
  console.log(value);
  storage.setItem(key, value.outerHTML);
};

export const removeItem = (key, value) => {
  const arr = JSON.parse(localStorage.getItem(key));
  arr.splice(arr.indexOf(value), 1);
  localStorage.setItem("toggle", JSON.stringify(arr));
};
