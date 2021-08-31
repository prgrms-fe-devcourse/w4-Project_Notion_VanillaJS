import { editCurrentDocument } from '../../utils/emitter.js';

import PageHeader from './PageHeader.js';
import PageBody from './PageBody.js';

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
	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
		onEdit: {
			editTitle: title => {
				const nextDocument = Object.assign({}, this.state.currentDocument);
				nextDocument.title = title;

				editCurrentDocument(nextDocument);
			},
			editContent: content => {
				const nextDocument = Object.assign({}, this.state.currentDocument);
				nextDocument.content = content;

				editCurrentDocument(nextDocument);
			},
		},
	});

	$target.appendChild($page);
	$page.appendChild($pageHeader);
	$page.appendChild($pageBody);
}
