export default function PageBody({ $target, initialState, onEdit }) {
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
		const convertedContent =
			content === 'null' ? '문서의 내용을 입력해보세요!' : content;

		$pageTitle.innerHTML = `
			<input type="text" class="page-title-input" value="${title}">
		`;
		$pageContent.innerHTML = `
			<textarea class="page-content-textarea">${convertedContent}</textarea>
		`;

		$pageTitle.querySelector('input').addEventListener('keyup', e => {
			const content = $pageContent.querySelector('textarea').value;

			const nextDocument = {
				title: e.target.value,
				content,
			};
			onEdit.editTitle(nextDocument);
		});

		$pageContent.querySelector('textarea').addEventListener('keyup', e => {
			const title = $pageTitle.querySelector('input').value;

			const nextDocument = {
				title,
				content: e.target.value,
			};
			onEdit.editContent(nextDocument);
		});
	};

	this.render();

	$target.appendChild($pageTitle);
	$target.appendChild($pageContent);
}
