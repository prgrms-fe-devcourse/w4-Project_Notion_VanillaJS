export const getIdFromUrl = () => {
  const { pathname } = window.location;
  const id = pathname.split("/");
  return id[2];
};

export const pushStateUrl = (id) => {
  history.pushState(null, null, `/`);
  history.replaceState(null, null, `documents/${id}`);
};

export const clearUrl = () => {
  history.replaceState(null, null, `/`);
};
