import { ROUTE_CHANGE_EVENT_NAME } from "./constant.js";

export const initRouter = (onRoute) => {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
        const { nextUrl } = e.detail;

        if (nextUrl) {
            history.pushState(null, null, nextUrl);
            onRoute();
        }
    })
}

export const push = (nextUrl) => {
    window.dispatchEvent(new CustomEvent('route-change', {
        detail: {
            nextUrl
        }
    }))
}
