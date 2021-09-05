import { on, emit } from '../utils/emitter.js';
import {
	closeChildList,
	makeNewPostLi,
	markListItemOfId,
	toggleList,
} from '../utils/render.js';
import { getStateAfter } from './gettersState.js';

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
		createDocument: async ({ id, $target, needMark }) => {
			const nextState = await getStateAfter('create', id);
			const newPostId = nextState.currentDocument.id;

			makeNewPostLi({ $target, needMark, newPostId });
			commit('SET_STATE', { nextState, needRender: 'postsPage' });
		},
		createDocumentOnModal: async ({ id, $target, needMark }) => {
			emit.showModal();

			const { documents, currentDocument, modalDocument } = await getStateAfter(
				'createOnModal',
				id,
			);
			const newPostId = modalDocument.id;

			emit.updateModal(modalDocument);
			makeNewPostLi({ $target, needMark, newPostId });

			commit('SET_STATE', {
				nextState: { documents, currentDocument },
				needRender: 'null',
			});
		},
		readDocument: async ({ id }) => {
			const nextState = await getStateAfter('read', id);
			commit('SET_STATE', { nextState, needRender: 'all' });

			markListItemOfId(id);
			history.pushState(null, null, `/posts/${id}`);
		},
		updateDocument: async ({ id, nextDocument }) => {
			const nextState = await getStateAfter('update', { id, nextDocument });
			commit('SET_STATE', { nextState, needRender: 'null' });
		},
		updateDocumentOnModal: async ({ id, nextDocument }) => {
			const nextState = await getStateAfter('updateOnModal', {
				id,
				nextDocument,
			});

			commit('SET_STATE', { nextState, needRender: 'null' });
		},
		deleteDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				closeChildList(id);

				const nextState = await getStateAfter('delete', id);
				commit('SET_STATE', { nextState, needRender: 'sideBar' });
			}
		},
		deleteCurrentDocument: async ({ id }) => {
			if (confirm('문서를 삭제하시겠습니까?')) {
				const $needRemoveSelected = $(`li[data-id="${id}"] .selected`);
				removeClass($needRemoveSelected, 'selected');
				closeChildList(id);

				const nextState = await getStateAfter('deleteCurrent', id);
				const postId = nextState.currentDocument.id;
				commit('SET_STATE', { nextState, needRender: 'all' });

				history.replaceState(
					null,
					null,
					`${postId ? `/posts/${postId}` : '/'}`,
				);
			}
		},
		deleteEmptyDocument: async ({ id }) => {
			const nextState = await getStateAfter('delete', id);
			commit('SET_STATE', { nextState, needRender: 'sideBar' });
		},
	};

	this.init = () => {
		on.toggleList(({ act, $li }) => toggleList({ act, $li }));
		on.createDocument(({ id, $target, needMark, onModal }) => {
			if (onModal) {
				dispatch('createDocumentOnModal', { id, $target, needMark });
			} else {
				dispatch('createDocument', { id, $target, needMark });
			}
		});
		on.readDocument(({ id }) => dispatch('readDocument', { id }));
		on.updateDocument(({ id, nextDocument, onModal }) => {
			if (onModal) {
				dispatch('updateDocumentOnModal', { id, nextDocument });
			} else {
				dispatch('updateDocument', { id, nextDocument });
			}
		});
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
