import { getItemFromStorage, setItemToStorage } from '../utils/storage.js';

const getOpenedLiAfter = (action, option) => {
	const newOpenedLi = gettersLi[action](option);

	setItemToStorage('openedLi', newOpenedLi);
	return newOpenedLi;
};

const gettersLi = {
	fetch: () => {
		return getItemFromStorage('openedLi') || [];
	},
	add: ({ openedLi, id }) => {
		const newOpenedLi = [...openedLi];

		if (!newOpenedLi.includes(id)) {
			newOpenedLi.push(id);
		}

		return newOpenedLi;
	},
	delete: ({ openedLi, id }) => {
		const newOpenedLi = [...openedLi];

		if (newOpenedLi.includes) {
			newOpenedLi.splice(newOpenedLi.indexOf(id), 1);
		}

		return newOpenedLi;
	},
};

export { getOpenedLiAfter };
