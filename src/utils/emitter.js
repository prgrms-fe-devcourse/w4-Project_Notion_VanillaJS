const EVENT_NAME = 'update:currentDocument';

const initEmitter = onUpdateState => {
	window.addEventListener(EVENT_NAME, e => {
		const { nextDocument } = e.detail;

		if (nextDocument) {
			onUpdateState(nextDocument);
		}
	});
};

const updateCurrentDocument = nextDocument => {
	window.dispatchEvent(
		new CustomEvent(EVENT_NAME, {
			detail: {
				nextDocument,
			},
		}),
	);
};

export { initEmitter, updateCurrentDocument };
