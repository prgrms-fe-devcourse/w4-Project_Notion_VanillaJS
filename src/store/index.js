import { on, emit } from '../utils/emitter.js';

import { setElementAfter } from './settersElement.js';
import { getStateAfter } from './gettersState.js';

export default function Store() {
	let updateTimer = null;

	const commit = (mutation, options) => {
		this.mutations[mutation](options);
	};

	const dispatch = (action, options) => {
		this.actions[action](options);
	};

	this.mutations = {
		SET_STATE: ({ nextState, needRender }) => {
			emit.updateState(nextState, needRender);
		},
	};

	this.actions = {
		createDocument: async ({ id, $target, needMark }) => {
			const nextState = await getStateAfter('create', id);

			commit('SET_STATE', { nextState, needRender: 'postsPage' });
			setElementAfter('create', { nextState, $target, needMark });
		},
		createDocumentOnModal: async ({ id, $target, needMark }) => {
			const { documents, currentDocument, modalDocument } = await getStateAfter(
				'createOnModal',
				id,
			);

			commit('SET_STATE', {
				nextState: { documents, currentDocument },
				needRender: 'null',
			});
			setElementAfter('createOnModal', { $target, needMark, modalDocument });
		},
		readDocument: async ({ id }) => {
			const nextState = await getStateAfter('read', id);

			commit('SET_STATE', { nextState, needRender: 'all' });
			setElementAfter('read', { id });
		},
		updateDocument: async ({ id, nextDocument, onModal }) => {
			if (updateTimer) {
				clearTimeout(updateTimer);
			}

			updateTimer = setTimeout(async () => {
				const action = onModal ? 'updateOnModal' : 'update';
				const nextState = await getStateAfter(action, { id, nextDocument });
				commit('SET_STATE', { nextState, needRender: 'null' });
			}, 200);
		},
		deleteDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				const nextState = await getStateAfter('delete', id);

				setElementAfter('delete', { id, nextState });
				commit('SET_STATE', { nextState, needRender: 'sideBar' });
			}
		},
		deleteCurrentDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				const nextState = await getStateAfter('deleteCurrent', id);

				setElementAfter('deleteCurrent', { id, nextState });
				commit('SET_STATE', { nextState, needRender: 'all' });
			}
		},
		deleteEmptyDocument: async ({ id }) => {
			const nextState = await getStateAfter('delete', id);

			setElementAfter('delete', { id, nextState: nextState.currentDocument });
			commit('SET_STATE', { nextState, needRender: 'sideBar' });
		},
	};

	this.init = () => {
		on.createDocument(({ id, $target, needMark, onModal }) => {
			if (onModal) {
				dispatch('createDocumentOnModal', { id, $target, needMark });
			} else {
				dispatch('createDocument', { id, $target, needMark });
			}
		});
		on.readDocument(({ id }) => dispatch('readDocument', { id }));
		on.updateDocument(({ id, nextDocument, onModal }) =>
			dispatch('updateDocument', { id, nextDocument, onModal }),
		);
		on.deleteDocument((id, isCurrent) => {
			if (isCurrent) {
				dispatch('deleteCurrentDocument', { id });
			} else {
				dispatch('deleteDocument', { id });
			}
		});
		on.deleteEmptyDocument(id => dispatch('deleteEmptyDocument', { id }));
	};

	this.init();
}
