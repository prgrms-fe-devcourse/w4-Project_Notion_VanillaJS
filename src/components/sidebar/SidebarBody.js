import { $createElement } from '../../utils/templates.js';

import {
	drawNavList,
	markListItemOfId,
	markListItemofLi,
} from '../../utils/render.js';

import { getOpenedLiAfter } from '../../store/gettersLi.js';

export default function SidebarBody({ $target, initialState, onClick }) {
	const $navList = $createElement('div', '.nav-list');
	const $ul = $createElement('ul', '.root');
	const $createBtn = $createElement('div', '.create-btn');
	$createBtn.innerHTML = `<span data-target="page">+ 페이지 추가</span>`;

	this.state = initialState;

	this.openedLi = getOpenedLiAfter('fetch');

	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		const { documents, currentDocument } = this.state;
		$ul.innerHTML = '';

		drawNavList($ul, documents, this.openedLi);

		$navList.appendChild($ul);
		$target.appendChild($navList);
		$target.appendChild($createBtn);

		if (!$('p.selected')) {
			markListItemOfId(currentDocument.id);
		}
	};

	this.init = () => {
		$createBtn.addEventListener('click', e => {
			onClick.createDocument(null, null);
		});

		$navList.addEventListener('click', e => {
			const { hideList, showList, deleteBtn, createDocument, readDocument } =
				onClick;
			const { tagName, className, parentNode } = e.target;

			if (tagName === 'UL' || tagName === 'LI' || className.includes('blank')) {
				return;
			}

			const isToggele = className.includes('nav-toggler-btn');
			const isDelete = className.includes('nav-delete-btn');
			const isCreate = className.includes('nav-crate-btn');

			const $li = tagName === 'P' ? parentNode : parentNode.parentNode;
			const { id } = $li.dataset;

			const openedLi = this.openedLi;
			if (isToggele) {
				const isOpend = e.target.className.includes('icon-down-dir');

				if (isOpend) {
					this.openedLi = getOpenedLiAfter('delete', { openedLi, id });
					hideList($li);
				} else {
					this.openedLi = getOpenedLiAfter('add', { openedLi, id });
					showList($li);
				}
			} else if (isDelete) {
				deleteBtn($li);
			} else if (isCreate) {
				this.openedLi = getOpenedLiAfter('add', { openedLi, id });
				createDocument(id, $li);
			} else {
				readDocument($li);
				markListItemofLi($li);
			}
		});
	};

	this.init();
}
