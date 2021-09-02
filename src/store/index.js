import { emit } from '../utils/emitter.js';
import notionAPI from '../api/notion.js';

export default function Store(initialState) {
	this.state = initialState;

	this.EMIT_APP_STATE = () => {
		const nextState = this.state;
		emit.updateState(nextState);
	};

	this.setState = nextState => {
		this.state = nextState;
	};

	this.disconnectState = () => {
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

	this.updateState = async (...needUpdateStates) => {
		const { getDocuments } = notionAPI;

		const oldState = this.disconnectState();
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
			this.setState(nextState);
		});
	};

	this.createDocument = async (id, onModal) => {
		const { createDocument } = notionAPI;

		const newDocument = await createDocument({
			title: '제목 없음',
			parent: id,
		});

		if (!onModal) {
			await this.updateState(
				{ allDocuments: null },
				{ currentDocument: newDocument.id },
			);

			this.EMIT_APP_STATE();
			history.pushState(null, null, `/posts/${newDocument.id}`);
		} else {
			await this.updateState(
				{ allDocuments: null },
				{ modalDocument: newDocument.id },
			);

			this.EMIT_APP_STATE();
		}
	};

	this.removeDocument = async (id, isCurrent) => {
		const { deleteDocument } = notionAPI;

		await deleteDocument(id);
		await this.updateState({ allDocuments: null });

		if (isCurrent) {
			const postId = this.state.allDocuments[0].id;
			await this.updateState({ currentDocument: postId });
			history.replaceState(null, null, `/posts/${postId}`);
		}

		this.EMIT_APP_STATE();
	};

	this.editDocument = async (id, nextDocument, onModal) => {
		const { updateDocument } = notionAPI;

		const updatedDocument = await updateDocument(id, nextDocument);

		if (!onModal) {
			await this.updateState(
				{ allDocuments: null },
				{ currentDocument: updatedDocument },
			);
		} else {
			await this.updateState(
				{ allDocuments: null },
				{ modalDocument: updatedDocument },
			);
		}

		this.EMIT_APP_STATE();
	};

	this.updateCurrentPage = async id => {
		await this.updateState({ currentDocument: id });
		this.EMIT_APP_STATE();
	};
}
