import { on, emit } from './utils/emitter.js';
import Store from './store/index.js';

import NotFoundPage from './components/NotFoundPage.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = needRenderItems => {
		needRenderItems.forEach(needRender => {
			switch (needRender) {
				case 'sideBar':
					sideBar.setState(this.state);
					break;
				case 'page':
					page.setState(this.state);
					break;
				case 'modal':
					modal.setState(this.state);
					break;
			}
		});
	};

	if (!initialState.currentDocument) {
		new NotFoundPage({ $target });
		return;
	}

	const store = new Store(initialState);

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
		await store.createDocument(id, onModal);

		if (!onModal) {
			this.render(['sideBar', 'page']);
		} else {
			this.render(['modal']);
			emit.showModal();
		}
	};

	const updateCurrentPage = async id => {
		await store.updateCurrentPage(id);
		this.render(['sideBar', 'page']);
	};

	const editDocument = async (id, nextDocument, onModal) => {
		await store.editDocument(id, nextDocument, onModal);
		this.render(['sideBar']);
	};

	const removeDocument = async id => {
		const isCurrent = Number(id) === this.state.currentDocument.id;

		if (confirm('문서를 삭제하시겠습니까?')) {
			await store.removeDocument(id, isCurrent);
			this.render(['sideBar']);

			if (isCurrent) {
				this.render(['page']);
			}
		}
	};

	on.updateUrl(id => updateCurrentPage(id));
	on.createDocument((id, modal) => createDocument(id, modal));
	on.editDocument((id, nextDocument, onModal) =>
		editDocument(id, nextDocument, onModal),
	);
	on.deleteDocument(id => removeDocument(id));
	on.updateState(nextState => this.setState(nextState));
}
