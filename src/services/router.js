const ROUTE_CHANGE_EVENT_TYPE = 'route-change';

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_TYPE, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener('popstate', () => {
    onRoute();
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_TYPE, {
      detail: {
        nextUrl,
      },
    }),
  );
};
