import { on, emit } from '../../utils/emitter.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target }) {
	const $modal = $createElement('div');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');
	addClassAll($modal, 'modal-container', 'hide');

	this.state = {
		id: null,
		title: '제목없음',
		content: '문서의 내용을 입력하세요!',
	};

	this.setState = nextState => {
		this.state = nextState;
		modalBody.setState(this.state);
	};

	const toggleModal = isShow => {
		if (isShow) {
			$modal.classList.remove('hide');
		} else {
			$modal.classList.add('hide');
		}
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				const { id } = this.state;

				emit.updateUrl(`/posts/${id}`);
				toggleModal(false);
			},
			closeModal: () => {
				toggleModal(false);
			},
		},
	});

	const modalBody = new ModalBody({
		$target: $modalBody,
		initialState: this.state,
		onEdit: document => {
			const { id } = this.state;
			emit.editDocument(id, document, true);
		},
	});

	on.showModal(() => {
		toggleModal(true);
	});
	on.hideModal(() => {
		toggleModal(false);
	});

	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);
}
