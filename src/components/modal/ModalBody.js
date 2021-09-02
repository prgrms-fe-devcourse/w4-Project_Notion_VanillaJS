export default function ModalBody({ $target, onEdit }) {
	const $modalTitle = $createElement('p', '.modal-title');
	const $modalContent = $createElement('p', '.modal-content');

	this.render = () => {
		const titleTemp = '제목 없음';
		const contentTemp = '문서를 입력해보세요!';

		$modalTitle.innerHTML = `
      <input
				type="text"
				class="modal-title-input"
				data-text=""
				value="${titleTemp}">
    `;

		$modalContent.innerHTML = `
      <textarea class="modal-content-textarea" data-text="">${contentTemp}</textarea>
    `;

		$modalTitle.querySelector('input').addEventListener('keyup', e => {
			const content = $modalContent.querySelector('textarea').value;
			const document = {
				title: e.target.value,
				content,
			};

			onEdit(document);
		});

		$modalContent.querySelector('textarea').addEventListener('keyup', e => {
			const title = $modalTitle.querySelector('input').value;
			const document = {
				title,
				content: e.target.value,
			};

			onEdit(document);
		});
	};

	this.render();

	$target.appendChild($modalTitle);
	$target.appendChild($modalContent);
}
