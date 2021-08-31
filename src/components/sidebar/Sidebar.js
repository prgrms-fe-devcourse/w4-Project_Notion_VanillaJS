import { updateCurrentDocument } from '../../utils/emitter.js';
import { $listItem } from '../../utils/templates.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div', '.col');
	$target.appendChild($sidebar);

	const $sidebarHeader = $createElement('div', '.sidebar-header');
	const $sidebarBody = $createElement('div', '.sidebar-body');
	const $sidebarFooter = $createElement('div', '.sidebar-footer');
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		sidbarBody.setState(this.state);
	};

	new SidebarHeader({
		$target: $sidebarHeader,
		initialState,
	});
	const sidbarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState,
		onClick: {
			toggler: $li => {
				console.log('toggler', $li);
			},
			title: $li => {
				const { id } = $li.dataset;
				updateCurrentDocument(id);
			},
			external: $li => {
				console.log('external', $li);
			},
			create: $li => {
				const $newLi = $listItem(
					'new',
					'제목없음',
					this.state['currentDocument'],
				);

				if (!$li) {
					$('.nav-list .tree').appendChild($newLi);
					return;
				}

				const $ul = $createElement('ul', '.tree');
				$ul.appendChild($newLi);
				addClassAll($li, 'nav-header', 'tree-toggler');
				$li.appendChild($ul);
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
	});
}
