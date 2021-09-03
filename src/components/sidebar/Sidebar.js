import { getItemFromStorage, setItemToStroage } from '../../utils/storage.js';
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
			showList: $li => {
				const { id } = $li.dataset;

				console.log(id);
				const currentLi = $li.querySelector('.icon-play');
				currentLi.classList.toggle('icon-play');
				currentLi.classList.toggle('icon-down-dir');

				const hiddenLi = $li.querySelector('.hide');
				hiddenLi.classList.remove('hide');
			},
			hideList: $li => {
				const { id } = $li.dataset;

				const currentLi = $li.querySelector('.icon-down-dir');
				currentLi.classList.toggle('icon-play');
				currentLi.classList.toggle('icon-down-dir');

				const needHiddenLi =
					$li.querySelector('.tree') || $li.querySelector('.blank');
				needHiddenLi.classList.add('hide');
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

	this.render = () => {
		sidebarBody.render();
	};

	$target.appendChild($sidebar);
	$sidebar.appendChild($sidebarHeader);
	$sidebar.appendChild($sidebarBody);
	$sidebar.appendChild($sidebarFooter);
}
