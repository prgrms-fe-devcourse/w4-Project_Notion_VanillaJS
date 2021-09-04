import { on, emit } from '../../utils/emitter.js';
import { $createElement } from '../../utils/templates.js';
import { checkNodata } from '../../utils/render.js';

import ModalHeader from './ModalHeader.js';
import ModalBody from './ModalBody.js';

export default function Modal({ $target }) {
	const $modal = $createElement('div', '.modal-container', '.hide');
	const $modalHeader = $createElement('div', '.modal-header');
	const $modalBody = $createElement('div', '.modal-body');

	this.state = {
		id: 'new',
		title: '제목 없음',
		content: '문서의 내용을 입력하세요!',
	};

	this.setState = nextState => {
		this.state = nextState;
	};

	const showModal = () => {
		$modal.classList.remove('hide');
	};
	const hideModal = () => {
		modalBody.render();
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

	const LIMIT_TIME = 200;
	let modalBodyUpdateTimer = null;

	const setUpdateEditTimer = (id, nextDocument) => {
		if (modalBodyUpdateTimer) {
			clearTimeout(modalBodyUpdateTimer);
		}
		modalBodyUpdateTimer = setTimeout(() => {
			emit.updateDocument(id, nextDocument, true);
		}, LIMIT_TIME);
	};

	const modalBody = new ModalBody({
		$target: $modalBody,
		onUpdate: {
			updateTitle: nextDocument => {
				const { id } = this.state;
				const { title } = nextDocument;

				const currentLi = $(`li[data-id="${id}"] .nav-page-title`);
				currentLi.textContent = title ? title : '제목 없음';

				const $target = $('.show-modal-title');
				checkNodata({ $target });

				setUpdateEditTimer(id, nextDocument);
			},
			updateContent: nextDocument => {
				const { id } = this.state;
				setUpdateEditTimer(id, nextDocument);
			},
		},
	});

	$target.appendChild($modal);
	$modal.appendChild($modalHeader);
	$modal.appendChild($modalBody);

	this.init = () => {
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

			const noData =
				!$('.show-modal-title')?.textContent &&
				!$('.show-modal-content')?.value;
			const isHide = $modal.classList.contains('hide');
			const isEmpty = !onModal && !isHide && noData;

			if (isEmpty) {
				emit.deleteEmptyDocument(this.state.id);
			}
			hideModal();
		});
	};

	this.init();
}
