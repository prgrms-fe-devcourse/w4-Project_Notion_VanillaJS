import { GENERAL } from './constants.js';

export const initRouter = onRoute => {
  window.addEventListener(GENERAL.ROUTE_CHANGE_EVENT_NAME, e => {
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

export const dispatchMovePage = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(GENERAL.ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};

export const dispatchEditorTitleChanged = () => {
  window.dispatchEvent(new CustomEvent(GENERAL.EDITOR_DATA_CHANGED));
};

export const initEditorDataChangedListener = onChange => {
  window.addEventListener(GENERAL.EDITOR_DATA_CHANGED, e => {
    onChange();
  });
};
