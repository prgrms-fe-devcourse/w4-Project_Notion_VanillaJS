import { emit } from '../../utils/emitter.js';

import PageHeader from './PostsPageHeader.js';
import PageBody from './PostsPageBody.js';

export default function Page({ $target, initialState }) {
	const $page = $createElement('div');
	const $pageHeader = $createElement('div', '.page-header');
	const $pageBody = $createElement('div', '.page-body');
	addClassAll($page, 'col', 'page-container');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		pageHeader.setState(this.state);
		pageBody.setState(this.state);
	};

	const pageHeader = new PageHeader({
		$target: $pageHeader,
		initialState,
	});

	let pageBodyEditTimer = null;

	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onEdit: {
			editTitle: nextDocument => {
				const { id } = this.state.currentDocument;
				emit.updateDocument(id, nextDocument, false);
			},
			editContent: nextDocument => {
				const { id } = this.state.currentDocument;

				if (pageBodyEditTimer) {
					clearTimeout(pageBodyEditTimer);
				}
				pageBodyEditTimer = setTimeout(() => {
					emit.updateDocument(id, nextDocument, false);
				}, 1000);
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageHeader);
	$page.appendChild($pageBody);
}
