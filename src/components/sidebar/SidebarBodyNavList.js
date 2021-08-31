export default function SidebarBodyNavList({ $target, initialState }) {
	const $navList = $createElement('ul', '.nav-list');
	$target.appendChild($navList);

	this.state = initialState;

	const $liTemplate = (title, id) => {
		const selected = id === this.state['currentDocument'].id ? 'selected"' : '';

		return `
      <button class="nav-toggler-btn">🔻</button>
      <span class="nav-page-title ${selected}">${title}</span>
      <button class="nav-external-btn">...</button>
      <button class="nav-crate-btn" data-target="modal">+</button>
    `;
	};

	const drawTree = (target, allDocuments) => {
		const $ul = $createElement('ul', 'tree');

		allDocuments.forEach(document => {
			const { id, title, documents } = document;

			const $li = $createElement('li');
			$li.setAttribute('data-id', id);
			$li.innerHTML = $liTemplate(title, id);

			if (documents.length > 0) {
				addClassAll($li, 'nav-header', 'tree-toggler');
				drawTree($li, documents);
			}
			$ul.appendChild($li);
		});

		target.appendChild($ul);
	};

	this.render = () => {
		const { allDocuments } = this.state;
		drawTree($navList, allDocuments);
	};

	this.render();
}
