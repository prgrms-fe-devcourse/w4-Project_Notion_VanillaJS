const STORAGE = window.sessionStorage;

const getDocumentFromStorage = key => {
	const paresdDocument = JSON.parse(STORAGE.getItem(key));

	return paresdDocument;
};

const setDocumentToStroage = (key, document) => {
	STORAGE.setItem(key, JSON.stringify(document));
};

export { getDocumentFromStorage, setDocumentToStroage };
