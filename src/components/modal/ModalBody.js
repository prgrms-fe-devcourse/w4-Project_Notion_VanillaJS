export default function ModalBody({ $target, initialState, onEdit }) {
	const $modalTitle = $createElement('p', 'modal-title');
	const $modalContent = $createElement('p', 'modal-content');

	this.state = initialState;
	this.setState = nextState => {
		console.log(this.state.modalDocument);
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		const { title, content } = this.state.modalDocument;

		$modalTitle.innerHTML = `
      <input type="text" placeholder="제목 없음" value="${title}">
    `;

		$modalContent.innerHTML = `
      <textarea placeholder="페이지의 내용을 입력해보세요!">${content}</textarea>
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
