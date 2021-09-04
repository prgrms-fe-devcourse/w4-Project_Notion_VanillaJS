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
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		const { documents, currentDocument } = this.state;
		const openedLi = getOpenedLiAfter('fetch');

		$ul.innerHTML = '';
		drawNavList($ul, documents, openedLi);

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

		$navList.addEventListener('mouseover', e => {
			const currentTarget = e.target.parentNode;

			const $needRemoveCollection = document.querySelectorAll('.show');
			const $deleteBtn = currentTarget.querySelector('.nav-delete-btn');
			const $createBtn = currentTarget.querySelector('.nav-create-btn');

			removeClassAll($needRemoveCollection, 'show');

			if (currentTarget.tagName !== 'LI') {
				addClass($deleteBtn, 'show');
				addClass($createBtn, 'show');
			}
		});

		$navList.addEventListener('mouseout', e => {
			const $needRemoveCollection = document.querySelectorAll('.show');
			removeClassAll($needRemoveCollection, 'show');
		});

		$navList.addEventListener('click', e => {
			const { toggleList, deleteBtn, createDocument, readDocument } = onClick;
			const { tagName, className, parentNode } = e.target;

			if (tagName === 'UL' || tagName === 'LI' || className.includes('blank')) {
				return;
			}

			const isToggele = className.includes('nav-toggler-btn');
			const isDelete = className.includes('nav-delete-btn');
			const isCreate = className.includes('nav-create-btn');

			const $li = tagName === 'P' ? parentNode : parentNode.parentNode;
			const { id } = $li.dataset;

			if (isToggele) {
				const isOpend = e.target.className.includes('icon-down-dir');

				if (isOpend) {
					toggleList('hide', $li);
				} else {
					toggleList('show', $li);
				}
			} else if (isDelete) {
				const { currentDocument } = this.state;
				const isCurrent = Number(id) === currentDocument.id;

				deleteBtn(id, isCurrent);
			} else if (isCreate) {
				createDocument(id, $li);
			} else {
				readDocument(id);
				markListItemofLi($li);
			}
		});
	};

	this.init();
}
