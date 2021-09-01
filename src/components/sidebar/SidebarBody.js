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

	const drawNavList = (target, allDocuments) => {
		const $ul = $createElement('ul', '.tree');

		allDocuments.forEach(document => {
			const { id, title, documents } = document;
			const $li = $listItem(id, title, this.state['currentDocument']);

			if (documents.length > 0) {
				addClassAll($li, 'nav-header', 'tree-toggler');
				drawNavList($li, documents);
			}

			$ul.appendChild($li);
		});

		target.appendChild($ul);
	};

	$navList.addEventListener('click', e => {
		const { togglerBtn, externalBtn, createDocument, getDocument } = onClick;
		const { tagName, className, parentNode } = e.target;

		if (tagName === 'UL' || tagName === 'LI') return;

		switch (className) {
			case 'nav-toggler-btn':
				togglerBtn(parentNode);
				break;
			case 'nav-external-btn':
				externalBtn(parentNode);
				break;
			case 'nav-crate-btn':
				const { id } = parentNode.dataset;
				createDocument(id, parentNode);
				break;
			default:
				getDocument(parentNode);
		}
	});

	$createBtn.addEventListener('click', e => {
		onClick.createDocument(null, null);
	});

	this.render = () => {
		$navList.innerHTML = '';
		drawNavList($navList, this.state['allDocuments']);
	};

	this.render();

	$target.appendChild($navList);
	$target.appendChild($createBtn);
}
