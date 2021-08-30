import { request } from '../services/api.js';
import { getItem, setItem } from '../services/storage.js';
import Editor from './Editor.js';

export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement('div');

  this.state = initialState;

  let docLocalSaveKey = `temp-document-${this.state.id}`;

  const tempDoc = getItem(docLocalSaveKey, {
    id: null,
    title: '',
    content: '',
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: tempDoc,
    onEditing: (doc) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        docLocalSaveKey = `temp-document-${doc.id}`;

        setItem(docLocalSaveKey, {
          ...doc,
          tempSaveDate: new Date(),
        });
      }, 1000);
    },
  });

  const fetchDoc = async () => {
    const { id } = this.state;

    const doc = await request(`/documents/${id}`);

    this.setState({
      ...this.state,
      ...doc,
    });
  };

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      await fetchDoc();
      return;
    }

    this.state = nextState;

    editor.setState({
      ...this.state,
    });
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
