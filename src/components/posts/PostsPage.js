import { emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';
import { checkNodata } from '../../utils/render.js';

import PageBody from './PostsPageBody.js';

export default function Page({ $target, initialState }) {
	const $page = $createElement('div', '.col', '.page-container');
	const $pageBody = $createElement('div', '.page-body');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		pageBody.setState(this.state);
	};

	this.render = () => {
		pageBody.render();
	};

	const LIMIT_TIME = 200;
	let pageBodyUpdateTimer = null;

	const setUpdateEditTimer = (id, nextDocument) => {
		if (pageBodyUpdateTimer) {
			clearTimeout(pageBodyUpdateTimer);
		}
		pageBodyUpdateTimer = setTimeout(() => {
			emit.updateDocument(id, nextDocument, false);
		}, LIMIT_TIME);
	};

	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state.currentDocument;
				const { title } = nextDocument;

				const $currentLi = $(`li[data-id="${id}"] span.nav-page-title`);
				$currentLi.textContent = title ? title : '제목 없음';

				const $target = $('.show-page-title');
				checkNodata({ $target });

				setUpdateEditTimer(id, nextDocument);
			},
			updateContent: nextDocument => {
				const { id } = this.state.currentDocument;

				setUpdateEditTimer(id, nextDocument);
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageBody);
}
