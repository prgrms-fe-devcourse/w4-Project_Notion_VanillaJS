import { getItemFromStorage, setItemtoStroage } from '../utils/storage.js';

import {
	getDocuments,
	createDocument,
	updateDocument,
	deleteDocument,
} from '../api/notion.js';

const getStateAfter = async (action, option) => {
	const state = await getters[action](option);

	if (state && !action.includes('Modal')) {
		setItemtoStroage('notionState', state);
	}
	return state;
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
	create: async id => {
		const newDocument = await createDocument({
			title: '제목 없음',
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

		setItemtoStroage('notionState', { documents, currentDocument });
		return { documents, currentDocument, modalDocument };
	},
	read: async id => {
		const documents = getItemFromStorage('notionState').documents;
		const currentDocument = await getDocuments(id);

		return { documents, currentDocument };
	},
	update: async ({ id, document }) => {
		const updatedDocument = await updateDocument(id, document);
		const documents = await getDocuments();

		return {
			documents,
			currentDocument: updatedDocument,
		};
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
