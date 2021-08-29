const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

export const push = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, {
    detail : {
      nextUrl
    }
  }))
}

export const initRouter = (onRoute) => {
  
  window.addEventListener(ROUTE_CHANGE_EVENT, e => {
    const { nextUrl } = e.detail;

    if(nextUrl) {
      history.pushState(null,null,nextUrl);
      onRoute();
    }
  })
}