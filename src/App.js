import notionAPI from './api/notion.js';
import { on, emit } from './utils/emitter.js';

import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target }) {
	const $row = $createElement('div', '.row');

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
	new Modal({
		$target,
		initialState: this.state,
	});

	$target.appendChild($row);

	const initState = async id => {
		const { getDocuments } = notionAPI;

		const allDocuments = await getDocuments();
		const postId = id ? id : allDocuments[0].id;
		const currentDocument = await getDocuments(postId);

		this.setState({ allDocuments, currentDocument });
		page.setState(this.state);
	};

	const createDocument = async id => {
		const { getDocuments, createDocument } = notionAPI;

		const document = {
			title: '제목 없음',
			parent: id,
		};

		const newDocument = await createDocument(document);
		this.state.allDocuments = await getDocuments();

		if (!id) {
			emit.updateUrl(`/posts/${newDocument.id}`);
		}
	};

	const updatePage = async id => {
		const { getDocuments } = notionAPI;

		const allDocuments = this.state.allDocuments;
		const currentDocument = await getDocuments(id);

		this.setState({ allDocuments, currentDocument });
		page.setState(this.state);
	};

	const editDocument = async (id, nextDocument) => {
		const currentDocument = await notionAPI.updateDocument(id, nextDocument);
		const allDocuments = await notionAPI.getDocuments();

		this.setState({ allDocuments, currentDocument });
	};

	this.route = () => {
		const { pathname } = window.location;
		const [, , id] = pathname.split('/');

		initState(id);
	};

	this.route();

	on.updateUrl(id => updatePage(id));
	on.editDocument((id, nextDocument) => editDocument(id, nextDocument));
	on.createDocument(id => createDocument(id));
}
