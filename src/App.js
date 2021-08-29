import Nav from './components/Nav.js';
import Editor from './components/Editor.js';

import { getDocuments } from './api/notion.js';

export default function App($target, initialState) {
	this.state = initialState;

	const nav = new Nav({
		$target,
		initialState: this.state,
		onClick: {
			getDocument: async id => {
				$('.selected')?.classList.remove('selected');
				$(`[data-id="${id}"] > .notion-document`)?.classList.add('selected');
				editor.setState(await getDocuments(id));
			},
			createDocument: async id => {
				const $ul = document.createElement('ul');
				const $li = document.createElement('li');
				$li.innerHTML = `
				<span class="notion-document"> 제목 없음 </span>
				<span class="document-context">...</span>
				<span class="document-create">+</span>`;

				$ul.appendChild($li);
				$(`[data-id="${id}"]`).append($ul);
			},
		},
	});
	const editor = new Editor({
		$target,
		initialState: this.state.currentDocument,
	});

	// const newDocumentModal = new NewDocumentModal({})
}
