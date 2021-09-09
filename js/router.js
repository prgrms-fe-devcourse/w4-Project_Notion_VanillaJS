const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
    window.onpopstate = (e) => {
        const currentUrl = document.location.href;
        const prevUrl = window.history.state.prevUrl;
        history.pushState({ prevUrl: currentUrl }, null, prevUrl);
        onRoute();
    }

    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
        const { nextUrl } = e.detail;
        if (nextUrl) {
            history.pushState({ prevUrl: nextUrl }, null, nextUrl);
            onRoute();
        }
    })
}

export const push = (nextUrl) => {
    window.dispatchEvent(new CustomEvent("route-change", {
        detail: {
            nextUrl
        }
    }))
}
