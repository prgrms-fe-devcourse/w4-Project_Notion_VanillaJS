const CURRENT_DOCUMENT_EVENT = 'update:currentDocument';
const MODAL_EVENT = 'show:modal';

const initCurrentDocumentEmitter = onUpdateState => {
	window.addEventListener(CURRENT_DOCUMENT_EVENT, e => {
		const { nextDocument } = e.detail;

		if (nextDocument) {
			onUpdateState(nextDocument);
		}
	});
};
const updateCurrentDocument = nextDocument => {
	window.dispatchEvent(
		new CustomEvent(CURRENT_DOCUMENT_EVENT, {
			detail: {
				nextDocument,
			},
		}),
	);
};

const initShowModalEmitter = onUpdateModal => {
	window.addEventListener(MODAL_EVENT, e => {
		onUpdateModal();
	});
};

const showDisplayModal = () => {
	window.dispatchEvent(new CustomEvent(MODAL_EVENT));
};

export {
	initCurrentDocumentEmitter,
	initShowModalEmitter,
	updateCurrentDocument,
	showDisplayModal,
};
