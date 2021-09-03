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

	this.render = () => {
		pageHeader.render();
		pageBody.render();
	};

	const pageHeader = new PageHeader({
		$target: $pageHeader,
		initialState,
	});

	const LIMIT_TIME = 200;
	let pageBodyUpdateTimer = null;

	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state.currentDocument;
				const currentLi = $(`li[data-id="${id}"] span`);
				currentLi.textContent = nextDocument.title;

				if (pageBodyUpdateTimer) {
					clearTimeout(pageBodyUpdateTimer);
				}
				pageBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, nextDocument);
				}, LIMIT_TIME);
			},
			updateContent: nextDocument => {
				const { id } = this.state.currentDocument;

				if (pageBodyUpdateTimer) {
					clearTimeout(pageBodyUpdateTimer);
				}
				pageBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, nextDocument);
				}, LIMIT_TIME);
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageHeader);
	$page.appendChild($pageBody);
}
