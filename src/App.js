import { initCurrentDocumentEmitter } from './utils/emitter.js';
import { getDocuments } from './api/notion.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');
	$target.appendChild($row);

	this.state = initialState;

	const getDocument = async id => {
		const currentDocument = await getDocuments(id);
		const nextState = {
			allDocuments: [...this.state.allDocuments],
			currentDocument,
		};

		this.setState(nextState);
	};

	this.setState = nextState => {
		this.state = nextState;
		sideBar.setState(this.state);
		page.setState(this.state);
	};

	const sideBar = new Sidebar({ $target: $row, initialState });
	const page = new Page({ $target: $row, initialState });
	const modal = new Modal({ $target, initialState });
	initCurrentDocumentEmitter(nextDocumentId => getDocument(nextDocumentId));
}
