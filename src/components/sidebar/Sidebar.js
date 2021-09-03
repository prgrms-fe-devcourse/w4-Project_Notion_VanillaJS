import { emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';

import {
	makeNewPostLiOnRoot,
	makeNewPostLiOnTree,
} from '../../utils/render.js';

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

	const toggleList = ({ act, $li }) => {
		let currentLi;
		let hiddenLi;

		if (act === 'show') {
			currentLi = $li.querySelector('.icon-play');
			hiddenLi = $li.querySelector('.hide');
		} else {
			currentLi = $li.querySelector('.icon-down-dir');
			hiddenLi = $li.querySelector('.tree') || $li.querySelector('.blank');
		}

		hiddenLi.classList.toggle('hide');
		currentLi.classList.toggle('icon-play');
		currentLi.classList.toggle('icon-down-dir');
	};

	new SidebarHeader({
		$target: $sidebarHeader,
	});

	const sidebarBody = new SidebarBody({
		$target: $sidebarBody,
		initialState: this.state,
		onClick: {
			showList: $li => {
				toggleList({ act: 'show', $li });
			},
			hideList: $li => {
				toggleList({ act: 'hide', $li });
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
					makeNewPostLiOnTree({ $target: $li, needMark: false });
					emit.createDocument({ id, onModal });
				} else {
					makeNewPostLiOnRoot({ needMark: true });
					emit.createDocument({ id, onModal });
				}
			},
		},
	});

	new SidebarFooter({
		$target: $sidebarFooter,
		onClick: {
			createDocument: () => {
				makeNewPostLiOnRoot({ needMark: false });
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
