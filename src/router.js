const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl, btnType, id, parentId } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute(btnType, id, parentId);
    } else {
      console.log("no url!");
    }
  });
};

export const push = (nextUrl, btnType, id, parentId) => {
  window.dispatchEvent(
    new CustomEvent("route-change", {
      detail: { nextUrl, btnType, id, parentId },
    })
  );
};
