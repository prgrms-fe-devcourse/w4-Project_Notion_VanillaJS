import {
	initEditDoumentEmitter,
	initCreateDocumnetEmitter,
} from './utils/emitter.js';
import { initRouter, push } from './routes/router.js';

import { getDocuments, putDocument, postDocument } from './api/notion.js';

import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');
	$target.appendChild($row);

	this.state = initialState;

	const getDocument = async id => {
		const currentDocument = await getDocuments(id);
		const allDocuments = await getDocuments();
		const nextState = {
			allDocuments,
			currentDocument,
		};

		this.setState(nextState);
		page.setState(this.state);
	};

	const editDocument = async nextDocument => {
		const { id, title, content } = nextDocument;
		const currentDocument = await putDocument(id, { title, content });
		const allDocuments = await getDocuments();

		const nextState = {
			allDocuments,
			currentDocument,
		};

		this.setState(nextState);
	};

	const createDocument = async newDocument => {
		if (newDocument) {
			console.log(newDocument);
		} else {
			const document = {
				title: '제목 없음',
				parent: null,
			};

			const res = await postDocument(document);
			push(`/posts/${res.id}`);
		}
	};

	this.setState = nextState => {
		this.state = nextState;
		sideBar.setState(this.state);
	};

	this.route = async () => {
		let postId = this.state.allDocuments[0].id;
		const { pathname } = window.location;

		if (pathname.indexOf('/posts/') === 0) {
			const [, , post] = pathname.split('/');

			if (post !== 'new') {
				postId = post;
				await getDocument(postId);
			} else {
				createDocument();
			}
			return;
		}

		await getDocument(postId);
	};

	const sideBar = new Sidebar({ $target: $row, initialState });
	const page = new Page({ $target: $row, initialState });
	new Modal({ $target, initialState });

	this.route();
	initEditDoumentEmitter(nextDocument => editDocument(nextDocument));
	initCreateDocumnetEmitter(newDocument => createDocument(newDocument));
	initRouter(() => this.route());
}
