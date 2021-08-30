export const debounce = (callback, delay) => {
  let timer;
  return event => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(callback, delay, event);
  };
};
