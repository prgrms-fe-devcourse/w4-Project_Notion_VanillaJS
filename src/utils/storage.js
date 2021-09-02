const STORAGE = window.sessionStorage;

const getItemFromStorage = key => {
	const paresdItem = JSON.parse(STORAGE.getItem(key));

	return paresdItem;
};

const setItemtoStroage = (key, item) => {
	STORAGE.setItem(key, JSON.stringify(item));
};

export { getItemFromStorage, setItemtoStroage };
