import { getItemFromStorage, setItemToStorage } from '../utils/storage.js';

import {
	getDocuments,
	createDocument,
	updateDocument,
	deleteDocument,
} from '../api/notion.js';

const DEFAULT_STATE = {
	documents: {},
	currentDocument: {},
};

const isValid = state => {
	let validResult = true;

	if (state && typeof state === 'object') {
		for (let key in DEFAULT_STATE) {
			validResult = state.hasOwnProperty(key);
		}
	}

	return validResult;
};

const getStateAfter = async (action, option) => {
	try {
		const state = await getters[action](option);

		if (!isValid(state)) {
			throw new Error('올바른 데이터 형식이 아닙니다!');
		}

		if (state && !action.includes('Modal')) {
			setItemToStorage('notionState', state);
		}

		return state;
	} catch (e) {
		alert('오류가 발생하여 notion을 다시 불러옵니다!');
		window.location = window.origin;
		console.log(e);
	}
};

const getters = {
	init: async () => {
		const { pathname } = window.location;
		const [, , id] = pathname.split('/');

		const documents = await getDocuments();

		const postId = id ? id : documents[0].id;
		const currentDocument = await getDocuments(postId);

		history.pushState(null, null, `/posts/${postId}`);
		return { documents, currentDocument };
	},
	fetch: async () => {
		const documents = await getDocuments();
		const currentDocument = await getDocuments(documents[0].id);

		history.pushState(null, null, `/`);
		return { documents, currentDocument };
	},
	create: async id => {
		const newDocument = await createDocument({
			title: '',
			parent: id,
		});
		const documents = await getDocuments();

		return {
			documents,
			currentDocument: newDocument,
		};
	},
	createOnModal: async id => {
		const modalDocument = await createDocument({
			title: '제목 없음',
			parent: id,
		});

		const documents = await getDocuments();
		const { currentDocument } = getItemFromStorage('notionState');

		setItemToStorage('notionState', { documents, currentDocument });
		return { documents, currentDocument, modalDocument };
	},
	read: async id => {
		const documents = getItemFromStorage('notionState').documents;
		const currentDocument = await getDocuments(id);

		return { documents, currentDocument };
	},
	update: async ({ id, nextDocument }) => {
		const updatedDocument = await updateDocument(id, nextDocument);
		const documents = await getDocuments();

		return {
			documents,
			currentDocument: updatedDocument,
		};
	},
	updateOnModal: async ({ id, nextDocument }) => {
		await updateDocument(id, nextDocument);
		const documents = await getDocuments();

		const { currentDocument } = getItemFromStorage('notionState');

		setItemToStorage('notionState', { documents, currentDocument });
		return { documents, currentDocument };
	},
	delete: async id => {
		await deleteDocument(id);

		const documents = await getDocuments();
		const { currentDocument } = getItemFromStorage('notionState');

		return { documents, currentDocument };
	},
	deleteCurrent: async id => {
		await deleteDocument(id);

		const documents = await getDocuments();
		const currentDocument = await getDocuments(documents[0].id);

		return { documents, currentDocument };
	},
};

export { getStateAfter };
