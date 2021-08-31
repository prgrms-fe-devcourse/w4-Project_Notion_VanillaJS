import PageHeader from './PageHeader.js';
import PageBody from './PageBody.js';

export default function Page({ $target, initialState }) {
	const $page = $createElement('div');
	const $pageHeader = $createElement('div', '.page-header');
	const $pageBody = $createElement('div', '.page-body');
	$target.appendChild($page);
	$page.appendChild($pageHeader);
	$page.appendChild($pageBody);
	addClassAll($page, 'col', 'page-container');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	const pageHeader = new PageHeader({
		$target: $pageHeader,
		initialState,
	});
	const pageBody = new PageBody({
		$target: $pageBody,
		initialState,
	});
}
