import { emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div', '.col', '.sidebar-container');
	const $sidebarHeader = $createElement('div', '.sidebar-header');
	const $sidebarBody = $createElement('div', '.sidebar-body');
	const $sidebarFooter = $createElement('div');

	this.state = {
		...initialState,
	};
	this.setState = nextState => {
		this.state = nextState;
		sidebarBody.setState(this.state);
	};

	this.render = () => {
		sidebarBody.render();
	};

	new SidebarHeader({
		$target: $sidebarHeader,
	});

	const sidebarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState: this.state,
		onClick: {
			toggleList: (act, $li) => {
				emit.toggleList({ act, $li });
			},
			readDocument: id => {
				emit.readDocument({ id });
			},
			deleteDocument: (id, isCurrent) => {
				emit.deleteDocument(id, isCurrent);
			},
			createDocument: (id, $li) => {
				const onModal = !!id;
				const needMark = onModal ? false : true;
				const $target = $li ? $li : null;

				emit.createDocument({ id, $target, needMark, onModal });
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				emit.createDocument({
					id: null,
					$target: null,
					needMark: false,
					onModal: true,
				});
			},
		},
	});

	$target.appendChild($sidebar);
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);
}
