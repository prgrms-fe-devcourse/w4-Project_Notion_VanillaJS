const ROUTER_CHANGE_EVENT_NAME = 'route-change'

const routerDispatcher = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(ROUTER_CHANGE_EVENT_NAME, {
    detail: {
      nextUrl
    }
  }))
}

const initRouter = (onRoute) => {
  window.addEventListener(ROUTER_CHANGE_EVENT_NAME, (event) => {
    const { nextUrl } = event.detail

    if (!!nextUrl) {
      history.pushState(null, null, nextUrl)
      onRoute()
    }
  })
}

export const RouterUtils = {
  routerDispatcher,
  initRouter
}

