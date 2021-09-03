export default function PageBody({ $target, initialState, onUpdate }) {
	const $pageTitle = $createElement('div', '.page-title');
	const $pageContent = $createElement('div', '.page-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		const { currentDocument } = this.state;
		const { title, content } = currentDocument;
		const convertedContent = !content ? '문서의 내용을 입력해보세요!' : content;

		$pageTitle.innerHTML = `
			<div class="show-page-title" contenteditable="true" >${title}</div>
		`;
		$pageContent.innerHTML = `
			<div class="show-page-content" contenteditable="true">${convertedContent}</div>
		`;

		$pageTitle
			.querySelector('.show-page-title')
			.addEventListener('keyup', e => {
				const content =
					$pageContent.querySelector('.show-page-content').textContent;

				const nextDocument = {
					title: e.target.textContent,
					content,
				};
				onUpdate.updateTitle(nextDocument);
			});

		$pageContent
			.querySelector('.show-page-content')
			.addEventListener('keyup', e => {
				const title = $pageTitle.querySelector('.page-title-input').textContent;

				const nextDocument = {
					title,
					content: e.target.textContent,
				};
				onUpdate.updateContent(nextDocument);
			});
	};

	$target.appendChild($pageTitle);
	$target.appendChild($pageContent);
}
