const STORAGE = window.sessionStorage;

const getItemFromStorage = key => {
	const paresdItem = JSON.parse(STORAGE.getItem(key));

	return paresdItem;
};

const setItemToStroage = (key, item) => {
	STORAGE.setItem(key, JSON.stringify(item));
};

export { getItemFromStorage, setItemToStroage };
