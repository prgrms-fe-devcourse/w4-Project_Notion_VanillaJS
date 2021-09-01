const EDIT_DOCUMENT_EVENT = 'edit:currentDocument';
const CREATE_DOCUMENT_EVENT = 'create:document';
const SHOW_MODAL_EVENT = 'show:modal';
const ROUTE_EVENT_NAME = 'route-change';

const on = {
	showModal: showModal => {
		window.addEventListener(SHOW_MODAL_EVENT, e => {
			showModal();
		});
	},
	editDocument: onEdit => {
		window.addEventListener(EDIT_DOCUMENT_EVENT, e => {
			const { id, nextDocument } = e.detail;

			if (id && nextDocument) {
				onEdit(id, nextDocument);
			}
		});
	},
	createDocument: onCreate => {
		window.addEventListener(CREATE_DOCUMENT_EVENT, e => {
			const { id } = e.detail;
			onCreate(id);
		});
	},
	updateUrl: onUpdate => {
		window.addEventListener(ROUTE_EVENT_NAME, e => {
			const { nextUrl } = e.detail;

			if (nextUrl) {
				history.pushState(null, null, nextUrl);

				const [, , id] = nextUrl.split('/');
				onUpdate(id);
			}
		});
	},
	updateRouter: onRoute => {
		window.addEventListener(ROUTE_EVENT_NAME, e => {
			const { nextState } = e.detail;

			if (nextState) {
				onRoute(nextState);
			}
		});
	},
};

const emit = {
	showModal: () => {
		window.dispatchEvent(new CustomEvent(SHOW_MODAL_EVENT));
	},
	editDocument: (id, nextDocument) => {
		window.dispatchEvent(
			new CustomEvent(EDIT_DOCUMENT_EVENT, {
				detail: {
					id,
					nextDocument,
				},
			}),
		);
	},
	createDocument: id => {
		window.dispatchEvent(
			new CustomEvent(CREATE_DOCUMENT_EVENT, {
				detail: {
					id,
				},
			}),
		);
	},
	updateUrl: nextUrl => {
		window.dispatchEvent(
			new CustomEvent(ROUTE_EVENT_NAME, {
				detail: {
					nextUrl,
				},
			}),
		);
	},
	updateRouter: nextState => {
		window.dispatchEvent(
			new CustomEvent(ROUTE_EVENT_NAME, {
				detail: {
					nextState,
				},
			}),
		);
	},
};

export { on, emit };
