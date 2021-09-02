import { $listItem } from '../../utils/templates.js';

export default function SidebarBody({ $target, initialState, onClick }) {
	const $navList = $createElement('div', '.nav-list');
	const $createBtn = $createElement('div', '.create-btn');
	$createBtn.innerHTML = `<span data-target="page">+ 페이지 추가</span>`;

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	const markCurrentLi = id => {
		const currentLi = id ? id : this.state.currentDocument.id;

		$('span.selected')?.classList.remove('selected');
		$(`li[data-id="${currentLi}"] span`)?.classList.add('selected');
	};

	const drawNavList = (target, documents) => {
		const $ul = $createElement('ul', '.tree');

		documents.forEach(document => {
			const { id, title, documents } = document;
			const $li = $listItem(id, title);

			if (documents.length > 0) {
				addClassAll($li, 'nav-header', 'tree-toggler');
				drawNavList($li, documents);
			}

			$ul.appendChild($li);
		});

		target.appendChild($ul);
	};

	$navList.addEventListener('click', e => {
		const { togglerBtn, deleteBtn, createDocument, readDocument } = onClick;
		const { tagName, className, parentNode } = e.target;

		if (tagName === 'UL' || tagName === 'LI') return;

		const { id } = parentNode.dataset;

		switch (className) {
			case 'nav-toggler-btn':
				togglerBtn(parentNode);
				break;
			case 'nav-delete-btn':
				deleteBtn(parentNode);
				break;
			case 'nav-crate-btn':
				createDocument(id, parentNode);
				break;
			default:
				readDocument(parentNode);
				markCurrentLi(id);
		}
	});

	$createBtn.addEventListener('click', e => {
		onClick.createDocument(null, null);
	});

	this.render = () => {
		const { documents, currentDocument } = this.state;

		$navList.innerHTML = '';
		drawNavList($navList, documents);

		$target.appendChild($navList);
		$target.appendChild($createBtn);

		if (!$('span.selected')) {
			const currentItem = `li[data-id="${currentDocument.id}"] span`;
			$navList.querySelector(`${currentItem}`).classList.add('selected');
		}
	};
}
