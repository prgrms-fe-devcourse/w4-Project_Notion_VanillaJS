export default function PageBody({ $target, initialState }) {
	const $pageTitle = $createElement('div', 'page-title');
	const $pageContent = $createElement('div', 'page-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { currentDocument } = this.state;
		const { title, content } = currentDocument;

		$pageTitle.innerHTML = `
			<input type="text" class="page-title-input" value="${title}">
		`;
		$pageContent.innerHTML = `
			<textarea class="page-content-textarea">${content}</textarea>
		`;
	};

	this.render();
	$target.appendChild($pageTitle);
	$target.appendChild($pageContent);
}
