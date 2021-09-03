import { getStateAfter } from './gettersState.js';
import { on, emit } from '../utils/emitter.js';

export default function Store() {
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
		createDocument: async ({ id }) => {
			const nextState = await getStateAfter('create', id);
			commit('SET_STATE', { nextState, needRender: 'all' });

			const postId = nextState.currentDocument.id;
			history.pushState(null, null, `/posts/${postId}`);
		},
		createDocumentOnModal: async ({ id }) => {
			emit.showModal();

			const { documents, currentDocument, modalDocument } = await getStateAfter(
				'createOnModal',
				id,
			);

			emit.updateModal(modalDocument);

			commit('SET_STATE', {
				nextState: { documents, currentDocument },
				needRender: 'sideBar',
			});
		},
		readDocument: async ({ id }) => {
			const nextState = await getStateAfter('read', id);
			commit('SET_STATE', { nextState, needRender: 'all' });
		},
		updateDocument: async ({ id, nextDocument }) => {
			const nextState = await getStateAfter('update', { id, nextDocument });
			commit('SET_STATE', { nextState, needRender: 'null' });
		},
		deleteDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				const nextState = await getStateAfter('delete', id);
				commit('SET_STATE', { nextState, needRender: 'sideBar' });
			}
		},
		deleteCurrentDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				const nextState = await getStateAfter('deleteCurrent', id);
				commit('SET_STATE', { nextState, needRender: 'all' });

				history.replaceState(
					null,
					null,
					`/posts/${nextState.currentDocument.id}`,
				);
			}
		},
		deleteEmptyDocument: async ({ id }) => {
			const nextState = await getStateAfter('delete', id);
			commit('SET_STATE', { nextState, needRender: 'sideBar' });
		},
	};

	this.init = () => {
		on.createDocument((id, onModal) => {
			if (onModal) {
				dispatch('createDocumentOnModal', { id });
			} else {
				dispatch('createDocument', { id });
			}
		});
		on.readDocument((id, needRender) =>
			dispatch('readDocument', { id, needRender }),
		);
		on.updateDocument((id, nextDocument) =>
			dispatch('updateDocument', { id, nextDocument }),
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
