export default function ModalBody({ $target, onUpdate }) {
	const $modalTitle = $createElement('p', '.modal-title');
	const $modalContent = $createElement('p', '.modal-content');

	this.render = () => {
		const titleTemp = '제목 없음';
		const contentTemp = '문서를 입력해보세요!';

		$modalTitle.innerHTML = `
			<div class="show-modal-title" contenteditable="true" datat-text="">${titleTemp}</div>
    `;

		$modalContent.innerHTML = `
			<div class="show-modal-content" contenteditable="true" datat-text="">${contentTemp}</div>
    `;

		$modalTitle
			.querySelector('.show-modal-title')
			.addEventListener('keyup', e => {
				const content = $modalContent.querySelector(
					'.show-modal-content',
				).textContent;
				const document = {
					title: e.target.textContent,
					content,
				};

				onUpdate.updateTitle(document);
			});

		$modalContent
			.querySelector('.show-modal-content')
			.addEventListener('keyup', e => {
				const title =
					$modalTitle.querySelector('.show-modal-title').textContent;
				const document = {
					title,
					content: e.target.textContent,
				};

				onUpdate.updateContent(document);
			});
	};

	this.render();

	$target.appendChild($modalTitle);
	$target.appendChild($modalContent);
}
