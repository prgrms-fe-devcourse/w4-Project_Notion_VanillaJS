export default function ModalBody({ $target, initialState }) {
	const $modalTitle = $createElement('p', 'modal-title');
	const $modalContent = $createElement('p', 'modal-content');
	$target.appendChild($modalTitle);
	$target.appendChild($modalContent);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$modalTitle.innerHTML = `
      <input type="text" placeholder="제목 없음">
    `;

		$modalContent.innerHTML = `
      <textarea placeholder="페이지의 내용을 입력해보세요!"></textarea>
    `;
	};

	this.render();
}
