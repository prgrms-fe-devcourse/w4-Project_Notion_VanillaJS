import App from './App.js';
import { getDocuments } from './api/notion.js';

const $target = document.querySelector('#app');

async function init() {
	const allDocuments = (await getDocuments()) || [];
	const currentDocument = allDocuments[0] || [];

	const initialState = {
		allDocuments,
		currentDocument,
	};

	new App({ $target, initialState });
}
init();
