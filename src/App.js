import { on, emit } from './utils/emitter.js';
import Store from './store/index.js';

import NotFoundPage from './components/NotFoundPage.js';
import Sidebar from './components/sidebar/Sidebar.js';
import Page from './components/page/Page.js';
import Modal from './components/modal/Modal.js';

export default function App({ $target, initialState }) {
	const $row = $createElement('div', '.row');

	if (!initialState?.currentDocument) {
		new NotFoundPage({ $target });
		return;
	}

	this.state = initialState;
	this.setState = (nextState, needRenderItems) => {
		this.state = nextState;
		this.render(needRenderItems);
	};

	this.render = needRenderItems => {
		needRenderItems.forEach(needRender => {
			switch (needRender) {
				case 'sideBar':
					sideBar.setState(this.state);
					break;
				case 'page':
					page.setState(this.state);
					break;
				case 'modal':
					modal.setState(this.state);
					emit.showModal();
					break;
			}
		});
	};

	new Store(initialState);

	const sideBar = new Sidebar({
		$target: $row,
		initialState: this.state,
	});
	const page = new Page({
		$target: $row,
		initialState: this.state,
	});
	const modal = new Modal({ $target });

	$target.appendChild($row);

	on.updateState((nextState, needRenderItems) =>
		this.setState(nextState, needRenderItems),
	);
	window.addEventListener('click', e => {
		const { className } = e.target;
		const isVisibleModal = !$('.modal-container').classList.contains('hide');

		if (className.includes('modal') || !isVisibleModal) {
			return;
		}

		const noData = $('li[data-id="new"]');

		if (noData) {
			const { id } = this.state.modalDocument;
			emit.deleteEmptyDocument(id);
		}

		emit.hideModal();
	});
}
