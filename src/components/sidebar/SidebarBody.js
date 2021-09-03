import {
	$createElement,
	$treeItem,
	$listItem,
	$blankItem,
} from '../../utils/templates.js';

import {
	fillListItem,
	markListItemOfId,
	markListItemofLi,
} from '../../utils/render.js';

import { getOpendeLiAfter } from '../../store/getters.js';

export default function SidebarBody({ $target, initialState, onClick }) {
	const $navList = $createElement('div', '.nav-list');
	const $ul = $createElement('ul', '.root');
	const $createBtn = $createElement('div', '.create-btn');
	$createBtn.innerHTML = `<span data-target="page">+ 페이지 추가</span>`;

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	const drawNavList = (target, childDocuments, isOpened) => {
		childDocuments.forEach(({ id, title, documents }) => {
			const $li = $listItem();
			const haveChild = documents.length > 0;

			if (haveChild) {
				const $tree = $treeItem();

				drawNavList($tree, documents, isOpened);
				addClass($li, 'nav-header', 'tree-toggler');
				$li.appendChild($tree);
			} else {
				const $blank = $blankItem();

				$li.appendChild($blank);
			}

			const $filledListItem = fillListItem($li, { id, title, isOpened });
			target.appendChild($filledListItem);
		});
	};

	$createBtn.addEventListener('click', e => {
		onClick.createDocument(null, null);
	});

	this.render = async () => {
		const { documents, currentDocument } = this.state;
		const isOpened = await getOpendeLiAfter('fetch');

		$ul.innerHTML = '';
		drawNavList($ul, documents, isOpened);

		$navList.appendChild($ul);
		$target.appendChild($navList);
		$target.appendChild($createBtn);

		if (!$('p.selected')) {
			markListItemOfId(currentDocument.id);
		}
	};

	$navList.addEventListener('click', e => {
		const { tagName, className, parentNode } = e.target;

		if (tagName === 'UL' || tagName === 'LI' || className.includes('blank')) {
			return;
		}

		const isToggele = className.includes('nav-toggler-btn');
		const isDelete = className.includes('nav-delete-btn');
		const isCreate = className.includes('nav-crate-btn');
		const $li = tagName === 'P' ? parentNode : parentNode.parentNode;
		const { id } = $li.dataset;

		if (isToggele) {
			const isOpend = e.target.className.includes('icon-down-dir');
			isOpend ? onClick.hideList($li) : onClick.showList($li);
		} else if (isDelete) {
			onClick.deleteBtn($li);
		} else if (isCreate) {
			onClick.createDocument(id, $li);
		} else {
			onClick.readDocument($li);
			markListItemofLi($li);
		}
	});
}
