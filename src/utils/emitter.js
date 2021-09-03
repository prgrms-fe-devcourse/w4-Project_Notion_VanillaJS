const UPDATE_STATE = 'update:state';
const SHOW_MODAL = 'show:modal';
const UPDATE_MODAL = 'update:modal';
const CREATE_DOCUMENT = 'create:document';
const READ_DOCUMENT = 'read:document';
const UPDATE_DOCUMENT = 'update:document';
const DELETE_DOCUMENT = 'delete:document';
const DELETE_DOCUMENT_EMPTY = 'delete:emptyDocument';

const on = {
	updateState(onUpdate) {
		window.addEventListener(UPDATE_STATE, e => {
			const { nextState, needUpdateItems } = e.detail;
			onUpdate(nextState, needUpdateItems);
		});
	},
	showModal(onShow) {
		window.addEventListener(SHOW_MODAL, e => {
			onShow();
		});
	},
	updateModal(onUpdate) {
		window.addEventListener(UPDATE_MODAL, e => {
			const { nextState } = e.detail;
			onUpdate(nextState);
		});
	},
	createDocument(onCreate) {
		window.addEventListener(CREATE_DOCUMENT, e => {
			const { id, onModal } = e.detail;
			onCreate(id, onModal);
		});
	},
	readDocument(onRead) {
		window.addEventListener(READ_DOCUMENT, e => {
			const { nextUrl } = e.detail;
			history.pushState(null, null, nextUrl);

			const [, , id] = nextUrl.split('/');
			onRead(id);
		});
	},
	updateDocument(onUpdate) {
		window.addEventListener(UPDATE_DOCUMENT, e => {
			const { id, document } = e.detail;

			if (id && document) {
				onUpdate(id, document);
			}
		});
	},
	deleteDocument(onDelete) {
		window.addEventListener(DELETE_DOCUMENT, e => {
			const { id, isCurrent } = e.detail;

			if (id) {
				onDelete(id, isCurrent);
			}
		});
	},
	deleteEmptyDocument(onDelete) {
		window.addEventListener(DELETE_DOCUMENT_EMPTY, e => {
			const { id } = e.detail;

			if (id) {
				onDelete(id);
			}
		});
	},
};

const emit = {
	updateState(nextState, needUpdateItems) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_STATE, {
				detail: {
					nextState,
					needUpdateItems,
				},
			}),
		);
	},
	showModal() {
		window.dispatchEvent(new CustomEvent(SHOW_MODAL));
	},
	updateModal(nextState) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_MODAL, {
				detail: {
					nextState,
				},
			}),
		);
	},
	createDocument(id, onModal) {
		window.dispatchEvent(
			new CustomEvent(CREATE_DOCUMENT, {
				detail: {
					id,
					onModal,
				},
			}),
		);
	},
	readDocument(nextUrl) {
		window.dispatchEvent(
			new CustomEvent(READ_DOCUMENT, {
				detail: {
					nextUrl,
				},
			}),
		);
	},
	updateDocument(id, document) {
		window.dispatchEvent(
			new CustomEvent(UPDATE_DOCUMENT, {
				detail: {
					id,
					document,
				},
			}),
		);
	},
	deleteDocument(id, isCurrent) {
		window.dispatchEvent(
			new CustomEvent(DELETE_DOCUMENT, {
				detail: {
					id,
					isCurrent,
				},
			}),
		);
	},
	deleteEmptyDocument(id) {
		window.dispatchEvent(
			new CustomEvent(DELETE_DOCUMENT_EMPTY, {
				detail: {
					id,
				},
			}),
		);
	},
};

export { on, emit };
