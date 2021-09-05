import { on, emit } from '../utils/emitter.js';

import {
	toggleList,
	makeNewPostLi,
	markListItemOfId,
	closeChildList,
} from '../utils/render.js';

const setElementAfter = (action, options) => {
	setters[action](options);
};

const setters = {
	create: ({ nextState, $target, needMark }) => {
		const newPostId = nextState.currentDocument.id;

		makeNewPostLi({ $target, needMark, newPostId });
		history.pushState(null, null, `/posts/${newPostId}`);
	},
	createOnModal: ({ $target, needMark, modalDocument }) => {
		const newPostId = modalDocument.id;

		emit.showModal();
		emit.updateModal(modalDocument);
		makeNewPostLi({ $target, needMark, newPostId });
	},
	read: ({ id }) => {
		markListItemOfId(id);
		history.pushState(null, null, `/posts/${id}`);
	},
	delete: ({ id, nextState }) => {
		closeChildList(id);
		markListItemOfId(nextState.id);
	},
	deleteCurrent: ({ id, nextState }) => {
		const nextId = nextState.currentDocument.id;
		let url = '/';

		if (nextId) {
			url = `/posts/${nextId}`;

			const $needRemoveSelected = $(`li[data-id="${id}"] .selected`);
			closeChildList(id);
			removeClass($needRemoveSelected, 'selected');
			markListItemOfId(nextId);
		}

		history.replaceState(null, null, url);
	},
};

on.toggleList(({ act, $li }) => toggleList({ act, $li }));

export { setElementAfter };
