const ROUTE_CHANGE_EVENT_NAME = 'route-change'
const POPSTATE_EVENT_NAME = 'popstate'

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail

    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      onRoute()
    }
  })
}

export const pushUrl = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent('route-change', {
      detail: {
        nextUrl,
      },
    }),
  )
}

export const popUrl = (onRoute) => {
  window.addEventListener(POPSTATE_EVENT_NAME, () => {
    onRoute()
  })
}
