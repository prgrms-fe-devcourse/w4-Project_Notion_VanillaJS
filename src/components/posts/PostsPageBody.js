import { $createElement } from '../../utils/templates.js';

export default function PageBody({ $target, initialState, onUpdate }) {
	const $pageTitle = $createElement('div', '.page-title');
	const $pageContent = $createElement('div', '.page-content');

	const $titleInput = $createElement('div', '.show-page-title');
	$titleInput.setAttribute('contenteditable', true);
	const $contentInput = $createElement('textarea', '.show-page-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
	};

	this.render = () => {
		const { currentDocument } = this.state;
		const { title, content } = currentDocument;

		const convertedTitle = !title ? '제목없음' : title;
		const convertedContent = !content ? '문서의 내용을 입력해보세요!' : content;

		$titleInput.textContent = convertedTitle;
		$contentInput.textContent = convertedContent;
	};

	$pageTitle.appendChild($titleInput);
	$pageContent.appendChild($contentInput);
	$target.appendChild($pageTitle);
	$target.appendChild($pageContent);

	this.init = () => {
		$titleInput.addEventListener('keyup', e => {
			const content = $contentInput.value;

			const nextDocument = {
				title: e.target.textContent,
				content,
			};

			onUpdate.updateTitle(nextDocument);
		});

		$contentInput.addEventListener('keyup', e => {
			const title = $titleInput.textContent;

			const nextDocument = {
				title,
				content: e.target.value,
			};

			onUpdate.updateContent(nextDocument);
		});
	};

	this.init();
}
