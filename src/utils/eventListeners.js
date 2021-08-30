import { ROUTE_CHANGE_EVENT_NAME, EDITOR_DATA_CHANGED } from './constants.js';

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const initBrowserRouter = onRoute => {
  window.addEventListener('popstate', e => {
    onRoute();
  });
};

export const movePage = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};

export const initEditorDataChangedListener = onChange => {
  window.addEventListener(EDITOR_DATA_CHANGED, e => {
    onChange();
  });
};
