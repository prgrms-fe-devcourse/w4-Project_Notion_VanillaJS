import { on, emit } from '../../utils/emitter.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target }) {
	const $modal = $createElement('div');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');
	addClassAll($modal, 'modal-container', 'hide');

	this.state = {
		id: 'new',
		title: '제목없음',
		content: '문서의 내용을 입력하세요!',
	};

	this.setState = nextState => {
		this.state = nextState;
	};

	const showModal = () => {
		$modal.classList.remove('hide');
	};

	const hideModal = () => {
		$modal.classList.add('hide');
	};

	new ModalHeader({
		$target: $modalHeader,
		onClick: {
			openPage: () => {
				const { id } = this.state;

				emit.readDocument(`/posts/${id}`);
				hideModal();
			},
			closeModal: () => {
				hideModal();
			},
		},
	});

	let modalBodyUpdateTimer = null;

	new ModalBody({
		$target: $modalBody,
		onUpdate: {
			updateTitle: document => {
				const { id } = this.state;

				const currentLi = $(`li[data-id="${id}"] span`);
				const currentInput = $('.modal-title-input').dataset;

				currentLi.textContent = document.title;
				currentInput.text = document.title;

				if (modalBodyUpdateTimer) {
					clearTimeout(modalBodyUpdateTimer);
				}
				modalBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, document);
				}, 1000);
			},
			updateContent: document => {
				const { id } = this.state;

				const currentTextArea = $('.modal-content-textarea').dataset;
				currentTextArea.text = document.content;

				if (modalBodyUpdateTimer) {
					clearTimeout(modalBodyUpdateTimer);
				}
				modalBodyUpdateTimer = setTimeout(() => {
					emit.updateDocument(id, document);
				}, 1000);
			},
		},
	});

	on.showModal(showModal);
	on.updateModal(nextState => {
		this.setState(nextState);
	});

	window.addEventListener('click', e => {
		const createBtn = e.target.dataset?.target === 'modal';
		const onModal = e.target.className.includes('modal');

		if (createBtn || onModal) {
			return;
		}

		const title = $('.modal-title-input').dataset.text;
		const content = $('.modal-content-textarea').dataset.text;
		const noData = !title && !content;
		const isHide = $modal.classList.contains('hide');
		const isEmpty = !onModal && !isHide && noData && this.state.id !== 'new';

		if (isEmpty) {
			emit.deleteEmptyDocument(this.state.id);
		}

		hideModal();
	});

	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);
}
