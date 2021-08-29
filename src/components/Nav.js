export default function Nav({ $target, initialState, onClick }) {
	const $tree = document.createElement('div');
	$target.appendChild($tree);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.drawTree = (target, state) => {
		const $ul = document.createElement('ul');

		state.forEach(item => {
			const { id, title, documents } = item;
			const $li = document.createElement('li');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `
				<span
					class="notion-document ${
						id === this.state.currentDocument['id'] ? 'selected' : ''
					}">
					${title}
				</span>
				<span class="document-context">...</span>
				<span class="document-create">+</span>
			`;

			if (documents.length > 0) {
				this.drawTree($li, documents);
			}
			$ul.appendChild($li);
		});
		target.appendChild($ul);
	};

	this.drawCreatePageBtn = () => {
		const $li = document.createElement('li');
		$li.classList.add('notion-create');
		$('nav ul').appendChild($li);

		$li.innerHTML = `
			<span class="create-btn">+</span>
			<span class="create-title">페이지 추가</span>
		`;
	};

	$tree.addEventListener('click', e => {
		const { tagName, className } = e.target;

		if (tagName !== 'SPAN') return;
		const { id } = e.target.parentNode.dataset;

		if (className.includes('notion-document')) {
			onClick.getDocument(parseInt(id));
		} else if (className.includes('create')) {
			if (id) {
				const $target = $(`[data-id="${id}"]`);
				onClick.createDocumentTree($target, true);
			} else {
				const $target = e.target.parentNode;
				onClick.createDocumentTree($target, false);
			}
		}
	});

	this.render = () => {
		this.drawTree($tree, this.state.allDocuments);
		this.drawCreatePageBtn();
	};

	this.render();
}
