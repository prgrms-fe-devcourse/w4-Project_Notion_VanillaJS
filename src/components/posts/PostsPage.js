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

	let pageBodyUpdateTimer = null;

	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onUpdate: {
			updateTitle: document => {
				const { id } = this.state.currentDocument;
				const currentLi = $(`li[data-id="${id}"] span`);
				currentLi.textContent = document.title;

				if (pageBodyUpdateTimer) {
					clearTimeout(pageBodyUpdateTimer);
				}
				pageBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, document);
				}, 1000);
			},
			updateContent: document => {
				const { id } = this.state.currentDocument;

				if (pageBodyUpdateTimer) {
					clearTimeout(pageBodyUpdateTimer);
				}
				pageBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, document);
				}, 1000);
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageHeader);
	$page.appendChild($pageBody);
}
