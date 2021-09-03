import { $listItem, $blankItem } from '../../utils/templates.js';

export default function SidebarBody({ $target, initialState, onClick }) {
	const $navList = $createElement('div', '.nav-list');
	const $createBtn = $createElement('div', '.create-btn');
	$createBtn.innerHTML = `<span data-target="page">+ 페이지 추가</span>`;

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	const markCurrentLi = id => {
		const currentLi = id ? id : this.state.currentDocument.id;

		$('span.selected')?.classList.remove('selected');
		$(`li[data-id="${currentLi}"] span`)?.classList.add('selected');
	};

	const drawNavList = (target, documents, isFirstNode) => {
		const $ul = $createElement('ul', '.tree');

		// if (!isFirstNode) {
		// 	$ul.classList.add('hide');
		// }

		documents.forEach(document => {
			const { id, title, documents } = document;
			const $li = $listItem(id, title);

			if (documents.length > 0) {
				addClassAll($li, 'nav-header', 'tree-toggler');
				drawNavList($li, documents);
			} else {
				const blankData = $blankItem();
				$li.appendChild(blankData);
			}

			$ul.appendChild($li);
		});

		target.appendChild($ul);
	};

	$createBtn.addEventListener('click', e => {
		onClick.createDocument(null, null);
	});

	this.render = () => {
		const { documents, currentDocument } = this.state;

		$navList.innerHTML = '';
		drawNavList($navList, documents, true);

		$target.appendChild($navList);
		$target.appendChild($createBtn);

		if (!$('p.selected')) {
			const currentItem = `li[data-id="${currentDocument.id}"] p`;
			$navList.querySelector(`${currentItem}`).classList.add('selected');
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
			markCurrentLi(id);
		}
	});
}
