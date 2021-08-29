import Nav from './components/Nav.js';
import Editor from './components/Editor.js';
import EditorModal from './components/EditorModal.js';

import { getDocuments } from './api/notion.js';

export default function App($target, initialState) {
	this.state = initialState;
	const $nav = document.createElement('nav');
	const $main = document.createElement('main');
	$target.appendChild($nav);
	$target.appendChild($main);

	const nav = new Nav({
		$target: $nav,
		initialState: this.state,
		onClick: {
			getDocument: async id => {
				$('.selected')?.classList.remove('selected');
				$(`[data-id="${id}"] > .notion-document`)?.classList.add('selected');
				editor.setState(await getDocuments(id));
			},
			createDocumentTree: async ($target, needUl) => {
				$('.editor-modal').classList.remove('hide');
				const $li = document.createElement('li');

				if (needUl) {
					const $ul = document.createElement('ul');

					$target.append($ul);
					$ul.appendChild($li);
				} else {
					$target.before($li);
				}

				$li.innerHTML = `
				<span class="temp-document"> 제목 없음 </span>
				<span class="temp-context">...</span>
				<span class="temp-create">+</span>`;
			},
		},
	});

	const editor = new Editor({
		$target: $main,
		initialState: this.state.currentDocument,
	});

	const editorModal = new EditorModal({
		$target: $main,
		initialState,
	});
}
