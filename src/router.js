export const getIdFromUrl = () => {
  const { pathname } = window.location;
  const id = pathname.split("/");
  return id[2];
};

export const pushStateUrl = (id) => {
  history.replaceState(null, null, `/`);
  history.pushState(null, null, `documents/${id}`);
};
