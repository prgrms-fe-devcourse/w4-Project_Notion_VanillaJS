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
				console.log($(`[data-id="${id}"]`));
			},
		},
	});
	const editor = new Editor({
		$target,
		initialState: this.state.currentDocument,
	});
}
