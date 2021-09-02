export default function ModalBody({ $target, initialState, onEdit }) {
	const $modalTitle = $createElement('p', '.modal-title');
	const $modalContent = $createElement('p', '.modal-content');

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { title, content } = this.state;
		const convertedContent = !content ? '문서의 내용을 입력해보세요!' : content;

		$modalTitle.innerHTML = `
      <input type="text" class="modal-title-input" placeholder="제목 없음" value="${title}">
    `;

		$modalContent.innerHTML = `
      <textarea class="modal-content-textarea">${convertedContent}</textarea>
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
