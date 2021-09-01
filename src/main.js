import App from './App.js';
import notionAPI from './api/notion.js';

const $target = document.querySelector('#app');

const initState = async id => {
	const { getDocuments } = notionAPI;

	const allDocuments = await getDocuments();
	const postId = id ? id : allDocuments[0].id;
	const currentDocument = await getDocuments(postId);
	const modalDocument = currentDocument;

	return { allDocuments, currentDocument, modalDocument };
};

const route = async () => {
	const { pathname } = window.location;
	const [, , id] = pathname.split('/');

	const initialState = await initState(id);
	new App({ $target, initialState });
};

route();
