import { $createElement } from '../../utils/templates.js';

export default function ModalBody({ $target, onUpdate }) {
	const $modalTitle = $createElement('p', '.modal-title');
	const $modalContent = $createElement('p', '.modal-content');

	const $titleInput = $createElement('div', '.show-modal-title');
	$titleInput.setAttribute('contenteditable', true);
	$titleInput.setAttribute('data-text', '');
	const $contentInput = $createElement('div', '.show-modal-content');
	$contentInput.setAttribute('contenteditable', true);
	$contentInput.setAttribute('data-text', '');

	this.init = () => {
		const titleTemp = '제목 없음';
		const contentTemp = '문서의 내용을 입력해보세요!';

		$titleInput.textContent = titleTemp;
		$contentInput.textContent = contentTemp;

		$modalTitle.appendChild($titleInput);
		$modalContent.appendChild($contentInput);
		$target.appendChild($modalTitle);
		$target.appendChild($modalContent);

		$titleInput.addEventListener('keyup', e => {
			const content = $contentInput.textContent;

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
				content: e.target.textContent,
			};

			onUpdate.updateContent(nextDocument);
		});
	};

	this.init();
}
