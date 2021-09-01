import { emit } from '../../utils/emitter.js';
import { $listItem } from '../../utils/templates.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div');
	const $sidebarHeader = $createElement('div', '.sidebar-header');
	const $sidebarBody = $createElement('div', '.sidebar-body');
	const $sidebarFooter = $createElement('div', '.sidebar-footer');
	addClassAll($sidebar, 'col', 'sidebar-container');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		sidbarBody.setState(this.state);
	};

	const createDocumentLi = $li => {
		const $newLi = $listItem('new', '제목없음', this.state['currentDocument']);

		if (!$li) {
			$('.nav-list .tree').appendChild($newLi);
			return;
		}

		const $ul = $createElement('ul', '.tree');
		$ul.appendChild($newLi);
		$li.appendChild($ul);
		addClassAll($li, 'nav-header', 'tree-toggler');
	};

	new SidebarHeader({
		$target: $sidebarHeader,
		initialState,
	});

	const sidbarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState,
		onClick: {
			togglerBtn: $li => {
				console.log('toggler', $li);
			},
			getDocument: $li => {
				const { id } = $li.dataset;
				emit.updateUrl(`/posts/${id}`);
			},
			externalBtn: $li => {
				console.log('삭제', $li);
			},
			createDocument: (id, $li) => {
				// if (id) {
				// 	emit.showModal();
				// }
				emit.createDocument(id);
				createDocumentLi($li);
				// emit.updateUrl(`/posts/new`);
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				emit.ShowModal();
				createDocumentLi();
			},
		},
	});

	$target.appendChild($sidebar);
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);
}
