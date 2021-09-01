const EDIT_DOCUMENT_EVENT = 'edit:currentDocument';
const MODAL_EVENT = 'show:modal';

const initShowModalEmitter = onUpdateModal => {
	window.addEventListener(MODAL_EVENT, e => {
		onUpdateModal();
	});
};

const showDisplayModal = () => {
	window.dispatchEvent(new CustomEvent(MODAL_EVENT));
};

const initEditDoumentEmitter = onEditState => {
	window.addEventListener(EDIT_DOCUMENT_EVENT, e => {
		const { nextDocument } = e.detail;

		if (nextDocument) {
			onEditState(nextDocument);
		}
	});
};

const editCurrentDocument = nextDocument => {
	window.dispatchEvent(
		new CustomEvent(EDIT_DOCUMENT_EVENT, {
			detail: {
				nextDocument,
			},
		}),
	);
};

export {
	initEditDoumentEmitter,
	initShowModalEmitter,
	editCurrentDocument,
	showDisplayModal,
};
