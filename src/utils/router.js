const ROUTE_CHANGE = 'route-change'

const push = (nextUrl) => {
  const currUrl = document.location.pathname

  history.pushState({ prevUrl: currUrl }, null, nextUrl)
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE))
}

const replace = (nextUrl) => {
  history.pushState({ prevUrl: nextUrl }, null, nextUrl)
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE))
}

const initRoute = (route) => {
  window.addEventListener(ROUTE_CHANGE, route)
  window.addEventListener('popstate', route)
}
const RouterUtils = {
  initRoute,
  push,
  replace,
}

export default RouterUtils
