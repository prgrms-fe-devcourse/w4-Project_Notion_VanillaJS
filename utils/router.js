const ROUTE_CHANGE_EVENT_NAME = 'route-change';
const POPSTATE_EVENT_NAME = 'popstate';

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
  window.addEventListener(POPSTATE_EVENT_NAME, e => {
    onRoute();
  });
};

export const push = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};

// 자동저장
export const replace = nextUrl => {
  history.replaceState(null, null, nextUrl);
};
