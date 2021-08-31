import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target, initialState }) {
	const $modal = $createElement('div', '.modal-container');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');
	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);

	this.state = initialState;
	this.setState = nextState => {
		this.state = nextState;
		modalBody.setState();
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				console.log('페이지로 열기');
			},
			closeModal: () => {
				console.log('modal 닫기');
			},
		},
	});
	const modalBody = new ModalBody({ $target: $modalBody, initialState });
}
