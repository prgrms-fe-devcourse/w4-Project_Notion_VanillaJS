import PageHeader from './PageHeader.js';
import PageBody from './PageBody.js';

export default function Page({ $target, initialState }) {
	const $sidebar = $createElement('div');
	addClassAll($sidebar, 'col', 'page-container');
	$target.appendChild($sidebar);

	const $pageHeader = $createElement('div', '.page-header');
	const $pageBody = $createElement('div', '.page-body');
	$sidebar.appendChild($pageHeader);
	$sidebar.appendChild($pageBody);

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
