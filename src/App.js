import notionAPI from './api/notion.js';
import { on, emit } from './utils/emitter.js';

import NotFoundPage from './components/NotFoundPage.js';
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

	if (!initialState.currentDocument) {
		new NotFoundPage({
			$target,
		});
		return;
	}

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

			this.setState(nextState);
			page.setState(this.state);

			history.pushState(null, null, `/posts/${newDocument.id}`);
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
		const { updateDocument, getDocuments } = notionAPI;
		const nextState = {};

		if (onModal) {
			nextState.currentDocument = this.state.currentDocument;
			nextState.modalDocument = await updateDocument(id, nextDocument);
		} else {
			nextState.currentDocument = await updateDocument(id, nextDocument);
			nextState.modalDocument = Object.assign({}, nextState.currentDocument);
		}
		nextState.allDocuments = await getDocuments();

		this.setState(nextState);
	};

	const removeDocument = async id => {
		const { getDocuments, deleteDocument } = notionAPI;

		if (confirm('문서를 삭제하시겠습니까?')) {
			const { modalDocument, currentDocument } = this.state;
			await deleteDocument(id);

			const nextState = {};
			nextState.allDocuments = await getDocuments();
			nextState.modalDocument = Object.assign({}, modalDocument);

			if (Number(id) === this.state['currentDocument'].id) {
				const postId = nextState.allDocuments[0].id;
				nextState.currentDocument = await getDocuments(postId);
				this.setState(nextState);
				page.setState(this.state);
			} else {
				nextState.currentDocument = Object.assign({}, currentDocument);
				this.setState(nextState);
			}
		}
	};

	on.updateUrl(id => updatePage(id));
	on.createDocument((id, modal) => createDocument(id, modal));
	on.editDocument((id, nextDocument, onModal) =>
		editDocument(id, nextDocument, onModal),
	);
	on.deleteDocument(id => removeDocument(id));
}
