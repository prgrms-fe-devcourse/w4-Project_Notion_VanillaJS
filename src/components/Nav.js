export default function Nav({ $target, initialState, onClick }) {
	const $nav = document.createElement('nav');
	$target.appendChild($nav);

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
			const $span = document.createElement('span');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `
				<span
					class="${
						id === this.state.currentDocument['id']
							? 'notion-document selected'
							: 'notion-document'
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

	$nav.addEventListener('click', e => {
		const { tagName, className } = e.target;

		if (tagName !== 'SPAN') return;
		const { id } = e.target.parentNode.dataset;

		if (className.includes('notion-document')) {
			onClick.getDocument(parseInt(id));
		} else if (className.includes('document-create')) {
			onClick.createDocument(parseInt(id));
		}
	});

	this.render = () => {
		this.drawTree($nav, this.state.allDocuments);
	};

	this.render();
}
