const STORAGE = window.sessionStorage;

const getDocumentFromStorage = () => {
	const paresdDocument = JSON.parse(STORAGE.getItem('preDocument'));

	return paresdDocument;
};

const setDocumentToStroage = document => {
	STORAGE.setItem('preDocument', JSON.stringify(document));
};

export { getDocumentFromStorage, setDocumentToStroage };
