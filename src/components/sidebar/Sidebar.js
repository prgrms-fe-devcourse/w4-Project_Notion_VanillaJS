import { emit } from '../../utils/emitter.js';
import { $drawNewLi } from '../../utils/templates.js';

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
		sidebarBody.setState(this.state);
	};

	new SidebarHeader({
		$target: $sidebarHeader,
		initialState,
	});

	const sidebarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState,
		onClick: {
			togglerBtn: $li => {
				console.log('toggler', $li);
			},
			readDocument: $li => {
				const { id } = $li.dataset;
				emit.readDocument(`/posts/${id}`);
			},
			deleteBtn: $li => {
				const { id } = $li.dataset;
				const isCurrent = Number(id) === this.state.currentDocument.id;

				emit.deleteDocument(id, isCurrent);
			},
			createDocument: (id, $li) => {
				const onModal = !!id;

				if (onModal) {
					$drawNewLi($li, false);
					emit.createDocument(id, onModal);
				} else {
					$drawNewLi($li, true);
					emit.createDocument(id, onModal);
				}
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				$drawNewLi();
				emit.createDocument(null, 'onModal');
			},
		},
	});

	$target.appendChild($sidebar);
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);
}
