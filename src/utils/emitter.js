const CREATE_DOCUMENT_EVENT = 'create:document';
const EDIT_DOCUMENT_EVENT = 'edit:currentDocument';
const DELETE_DOCUMENT_EVENT = 'delete:document';
const DELETE_EMPTY_DOCUMENT_EVENT = 'delete:emptyDocument';
const SHOW_MODAL_EVENT = 'show:modal';
const HIDE_MODAL_EVENT = 'hide:modal';
const ROUTE_EVENT_NAME = 'update:route';
const STATE_EVENT_NAME = 'updae:state';

const on = {
	showModal(showModal) {
		window.addEventListener(SHOW_MODAL_EVENT, e => {
			const { nextState } = e.detail;
			showModal(nextState);
		});
	},
	hideModal(hideModal) {
		window.addEventListener(HIDE_MODAL_EVENT, e => {
			hideModal();
		});
	},
	createDocument(onCreate) {
		window.addEventListener(CREATE_DOCUMENT_EVENT, e => {
			const { id, onModal } = e.detail;
			onCreate(id, onModal);
		});
	},
	editDocument(onEdit) {
		window.addEventListener(EDIT_DOCUMENT_EVENT, e => {
			const { id, nextDocument, onModal } = e.detail;

			if (id && nextDocument) {
				onEdit(id, nextDocument, onModal);
			}
		});
	},
	deleteEmptyDocument(onDelete) {
		window.addEventListener(DELETE_EMPTY_DOCUMENT_EVENT, e => {
			const { id } = e.detail;

			if (id) {
				onDelete(id);
			}
		});
	},
	deleteDocument(onDelete) {
		window.addEventListener(DELETE_DOCUMENT_EVENT, e => {
			const { id } = e.detail;

			if (id) {
				onDelete(id);
			}
		});
	},
	updateUrl(onUpdate) {
		window.addEventListener(ROUTE_EVENT_NAME, e => {
			const { nextUrl } = e.detail;

			if (nextUrl) {
				history.pushState(null, null, nextUrl);

				const [, , id] = nextUrl.split('/');
				onUpdate(id);
			}
		});
	},
	updateState(onUpdateState) {
		window.addEventListener(STATE_EVENT_NAME, e => {
			const { nextState, needUpdateItems } = e.detail;
			onUpdateState(nextState, needUpdateItems);
		});
	},
};

const emit = {
	showModal(nextState) {
		window.dispatchEvent(
			new CustomEvent(SHOW_MODAL_EVENT, {
				detail: {
					nextState,
				},
			}),
		);
	},
	hideModal() {
		window.dispatchEvent(new CustomEvent(HIDE_MODAL_EVENT));
	},
	createDocument(id, onModal) {
		window.dispatchEvent(
			new CustomEvent(CREATE_DOCUMENT_EVENT, {
				detail: {
					id,
					onModal,
				},
			}),
		);
	},
	editDocument(id, nextDocument, onModal) {
		window.dispatchEvent(
			new CustomEvent(EDIT_DOCUMENT_EVENT, {
				detail: {
					id,
					nextDocument,
					onModal,
				},
			}),
		);
	},
	deleteDocument(id) {
		window.dispatchEvent(
			new CustomEvent(DELETE_DOCUMENT_EVENT, {
				detail: {
					id,
				},
			}),
		);
	},
	deleteEmptyDocument(id) {
		window.dispatchEvent(
			new CustomEvent(DELETE_EMPTY_DOCUMENT_EVENT, {
				detail: {
					id,
				},
			}),
		);
	},
	updateUrl(nextUrl) {
		window.dispatchEvent(
			new CustomEvent(ROUTE_EVENT_NAME, {
				detail: {
					nextUrl,
				},
			}),
		);
	},
	updateState(nextState, needUpdateItems) {
		window.dispatchEvent(
			new CustomEvent(STATE_EVENT_NAME, {
				detail: {
					nextState,
					needUpdateItems,
				},
			}),
		);
	},
};

export { on, emit };
