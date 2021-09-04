import { getItemFromStorage, setItemToStorage } from '../utils/storage.js';

const getOpenedLiAfter = (action, option) => {
	const newOpenedLi = gettersLi[action](option);

	gettersLi.openedLi = newOpenedLi;
	setItemToStorage('openedLi', newOpenedLi);
	return newOpenedLi;
};

const gettersLi = {
	openedLi: [],
	fetch: () => {
		gettersLi.openedLi = getItemFromStorage('openedLi', []) || [];
		return gettersLi.openedLi;
	},
	add: ({ id }) => {
		const newOpenedLi = [...gettersLi.openedLi];

		if (!newOpenedLi.includes(id)) {
			newOpenedLi.push(id);
		}

		return newOpenedLi;
	},
	delete: ({ id }) => {
		const newOpenedLi = [...gettersLi.openedLi];

		if (newOpenedLi.includes) {
			newOpenedLi.splice(newOpenedLi.indexOf(id), 1);
		}

		return newOpenedLi;
	},
};

export { getOpenedLiAfter };
