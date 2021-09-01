const ROUTE_EVENT_NAME = 'route-change';

const initRouter = onRounte => {
	window.addEventListener(ROUTE_EVENT_NAME, e => {
		const { nextUrl } = e.detail;

		if (nextUrl) {
			history.pushState(null, null, nextUrl);
			onRounte();
		}
	});
};

const push = nextUrl => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_EVENT_NAME, {
			detail: {
				nextUrl,
			},
		}),
	);
};

export { initRouter, push };
