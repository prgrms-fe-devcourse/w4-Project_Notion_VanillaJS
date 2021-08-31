const ROUTER_CHANGE_EVENT_NAME = 'route-change'

export const trigger = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(ROUTER_CHANGE_EVENT_NAME, {
    detail: {
      nextUrl
    }
  }))
}

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTER_CHANGE_EVENT_NAME, (event) => {
    const { nextUrl } = event.detail

    if (!!nextUrl) {
      history.pushState(null, null, nextUrl)
      onRoute()
    }
  })
}

