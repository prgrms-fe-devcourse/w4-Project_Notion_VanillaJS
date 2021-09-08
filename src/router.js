const EVENT_TYPE = 'route-change'

const initRouter = (onRoute) => {
    window.addEventListener(EVENT_TYPE, (event) => {
        const { nextUrl } = event.detail;

        if (nextUrl) {
            history.pushState(null, null, nextUrl);
            onRoute();
        }
    })
}

const pushRoute = (nextUrl) => {
    window.dispatchEvent(
        new CustomEvent(EVENT_TYPE, {
            detail: {
                nextUrl
            }
        })
    )
}

export { initRouter, pushRoute }
