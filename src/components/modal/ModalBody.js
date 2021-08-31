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
      <input type="text">
    `;

		$modalContent.innerHTML = `
      <textarea></textarea>
    `;
	};

	this.render();
}
