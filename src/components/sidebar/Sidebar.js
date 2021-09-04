import { emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';
import { toggleList, makeNewPostLi } from '../../utils/render.js';

import SidebarHeader from './SidebarHeader.js';
import SidebarBody from './SidebarBody.js';
import SidebarFooter from './SidebarFooter.js';

export default function Sidebar({ $target, initialState }) {
	const $sidebar = $createElement('div', '.col', '.sidebar-container');
	const $sidebarHeader = $createElement('div', '.sidebar-header');
	const $sidebarBody = $createElement('div', '.sidebar-body');
	const $sidebarFooter = $createElement('div', '.sidebar-footer');

	this.state = {
		...initialState,
	};
	this.setState = nextState => {
		this.state = nextState;
		sidebarBody.setState(this.state);
	};

	new SidebarHeader({
		$target: $sidebarHeader,
	});

	const sidebarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState: this.state,
		onClick: {
			toggleList: (act, $li) => {
				toggleList({ act, $li });
			},
			readDocument: id => {
				emit.readDocument(`/posts/${id}`);
			},
			deleteBtn: (id, isCurrent) => {
				emit.deleteDocument(id, isCurrent);
			},
			createDocument: (id, $li) => {
				const onModal = !!id;
				const needMark = onModal ? false : true;
				const $target = $li ? $li : null;

				makeNewPostLi({ $target, needMark });
				emit.createDocument({ id, onModal });
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				makeNewPostLi({ $target: null, needMark: false });
				emit.createDocument({ id: null, onModal: true });
			},
		},
	});

	this.render = () => {
		sidebarBody.render();
	};

	$target.appendChild($sidebar);
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);
}
