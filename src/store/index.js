import { on, emit } from '../utils/emitter.js';
import notionAPI from '../api/notion.js';

export default function Store(initialState) {
	const defaultState = {
		allDocuments: [],
		currentDocument: {},
		modalDocument: {},
	};

	this.state = initialState || defaultState;

	this.mutations = {
		SET_APP_STATE: needRenderItems => {
			const nextState = this.state;
			emit.updateState(nextState, needRenderItems);
		},
		SET_STORE_STATE: nextState => {
			this.state = nextState;
		},
	};

	const commit = (mutation, option) => {
		this.mutations[mutation](option);
	};

	const disconnectedOrignState = () => {
		const state = this.state;
		const allDocuments = [...state.allDocuments];

		const disconnectedState = {
			allDocuments: [],
			currentDocument: {},
			modalDocument: {},
		};

		const newObject = object => {
			return Object.assign({}, object);
		};

		for (let key in allDocuments) {
			const newValue = newObject(allDocuments[key]);
			disconnectedState.allDocuments.push(newValue);
		}

		disconnectedState.currentDocument = newObject(state.currentDocument);
		disconnectedState.modalDocument = newObject(state.modalDocument);

		return disconnectedState;
	};

	const updateState = async (...needUpdateStates) => {
		const { getDocuments } = notionAPI;

		const oldState = disconnectedOrignState();
		const nextState = Object.assign({}, oldState);

		const processUpdate = needUpdateStates.map(async state => {
			const needUpdate = Object.keys(state)[0];
			const post = Object.values(state)[0];

			if (needUpdate === 'allDocuments') {
				nextState[needUpdate] = await getDocuments();
				return;
			}

			if (post && typeof post !== 'object') {
				nextState[needUpdate] = await getDocuments(post);
			} else {
				nextState[needUpdate] = post;
			}
		});

		await Promise.all(processUpdate).then(() => {
			commit('SET_STORE_STATE', nextState);
		});
	};

	const createDocument = async (id, onModal) => {
		const { createDocument } = notionAPI;
		const newDocument = await createDocument({
			title: '제목 없음',
			parent: id,
		});

		if (!onModal) {
			await updateState({ allDocuments: null });
			updateCurrentPage(newDocument.id);
			return;
		}

		await updateState(
			{ allDocuments: null },
			{ modalDocument: newDocument.id },
		);

		commit('SET_APP_STATE', ['modal']);
	};

	const removeDocument = async id => {
		const { deleteDocument } = notionAPI;
		const isCurrent = Number(id) === this.state.currentDocument.id;

		if (confirm('문서를 삭제하시겠습니까?')) {
			await deleteDocument(id);
			await updateState({ allDocuments: null });

			if (isCurrent) {
				const postId = this.state.allDocuments[0].id;

				updateCurrentPage(postId);
				commit('SET_APP_STATE', ['sideBar', 'page']);
				return;
			}

			commit('SET_APP_STATE', ['sideBar']);
		}
	};

	const removeEmptyDocument = async id => {
		const { deleteDocument } = notionAPI;
		await deleteDocument(id);
		await updateState({ allDocuments: null });

		commit('SET_APP_STATE', ['sideBar']);
	};

	const editDocument = async (id, nextDocument, onModal) => {
		const { updateDocument } = notionAPI;

		const updatedDocument = await updateDocument(id, nextDocument);

		if (!onModal) {
			await updateState(
				{ allDocuments: null },
				{ currentDocument: updatedDocument },
			);
		} else {
			await updateState(
				{ allDocuments: null },
				{ modalDocument: updatedDocument },
			);
		}

		commit('SET_APP_STATE', ['sideBar']);
	};

	const updateCurrentPage = async id => {
		await updateState({ currentDocument: id });
		commit('SET_APP_STATE', ['sideBar', 'page']);

		history.pushState(null, null, `/posts/${id}`);
	};

	on.updateUrl(id => updateCurrentPage(id));
	on.createDocument((id, modal) => createDocument(id, modal));
	on.editDocument((id, nextDocument, onModal) =>
		editDocument(id, nextDocument, onModal),
	);
	on.deleteDocument(id => removeDocument(id));
	on.deleteEmptyDocument(id => removeEmptyDocument(id));
}
