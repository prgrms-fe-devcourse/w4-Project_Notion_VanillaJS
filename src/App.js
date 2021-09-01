import { setDocumentToStroage } from './utils/storage.js';
import notionAPI from './api/notion.js';
import { on, emit } from './utils/emitter.js';

import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		sideBar.setState(this.state);
	};

	const sideBar = new Sidebar({
		$target: $row,
		initialState: this.state,
	});
	const page = new Page({
		$target: $row,
		initialState: this.state,
	});
	const modal = new Modal({
		$target,
		initialState: this.state,
	});

	$target.appendChild($row);
	console.log(this.state.allDocuments);

	const createDocument = async (id, onModal) => {
		const { getDocuments, createDocument } = notionAPI;
		const nextState = {};

		const document = {
			title: '제목 없음',
			parent: id,
		};

		const newDocument = await createDocument(document);
		nextState.allDocuments = await getDocuments();
		nextState.currentDocument = this.state.currentDocument;
		nextState.modalDocument = await getDocuments(newDocument.id);

		if (!onModal) {
			nextState.currentDocument = await getDocuments(newDocument.id);
			history.pushState(null, null, `/posts/${newDocument.id}`);
			this.setState(nextState);
			page.setState(this.state);
		} else {
			this.setState(nextState);
			modal.setState(this.state);
			emit.showModal();
		}
	};

	const updatePage = async id => {
		const { getDocuments } = notionAPI;

		const allDocuments = this.state.allDocuments;
		const currentDocument = await getDocuments(id);
		const modalDocument = Object.assign({}, currentDocument);

		this.setState({ allDocuments, currentDocument, modalDocument });
		page.setState(this.state);
	};

	const editDocument = async (id, nextDocument, onModal) => {
		const nextState = {};

		console.log(onModal);
		if (onModal) {
			// console.log(nextState.currentDocument.id, nextState.modalDocument.id);
			nextState.currentDocument = this.state.currentDocument;
			nextState.modalDocument = await notionAPI.updateDocument(
				id,
				nextDocument,
			);
		} else {
			nextState.currentDocument = await notionAPI.updateDocument(
				id,
				nextDocument,
			);
			nextState.modalDocument = Object.assign({}, nextState.currentDocument);
		}
		nextState.allDocuments = await notionAPI.getDocuments();

		this.setState(nextState);
	};

	on.updateUrl(id => updatePage(id));
	on.editDocument((id, nextDocument, onModal) =>
		editDocument(id, nextDocument, onModal),
	);
	on.createDocument((id, modal) => createDocument(id, modal));
}
