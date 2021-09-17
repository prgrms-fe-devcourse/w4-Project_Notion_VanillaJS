import Editor from './Editor.js';
import SubDocLinks from './SubDocLinks.js';
import Toast, { TOAST_SUCCESS_TYPE } from './Toast.js';

import { request } from '../services/api.js';
import {
  getItem,
  removeItem,
  setItem,
} from '../services/storage.js';

import { $, createElement } from '../utils/dom.js';

export default function EditorPage({ $target, initialState }) {
  const $pageContainer = createElement('div', {
    class: 'editor-page-container',
  });

  const $page = createElement('div', {
    class: 'editor-page',
  });

  $pageContainer.appendChild($page);

  this.state = initialState;

  const docTempSaveKey = (id) => `temp-doc-${id}`;

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      id: null,
      title: '',
      content: '',
    },
    onEditing: (doc) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        setItem(docTempSaveKey(doc.id), {
          ...doc,
          tempSaveDate: new Date(),
        });

        const $docTreeTitle = $(`.doc-title[data-id="${doc.id}"]`);
        $docTreeTitle.textContent = `${doc.title}(${doc.id})`;

        await request(`/documents/${doc.id}`, {
          method: 'PUT',
          body: JSON.stringify(doc),
        });

        new Toast({
          type: TOAST_SUCCESS_TYPE,
          message: 'Your changes are saved.',
        });

        removeItem(docTempSaveKey(doc.id));
      }, 1000);
    },
  });

  const subdocLinks = new SubDocLinks({
    $target: $page,
    initialState: [],
  });

  const fetchDoc = async () => {
    const { id } = this.state;

    if (!id) {
      return;
    }

    const doc = await request(`/documents/${id}`);

    if (!doc) {
      return;
    }

    const tempSavedDoc = getItem(docTempSaveKey(id) || {});

    if (tempSavedDoc && tempSavedDoc.tempSaveDate > doc.updatedAt) {
      if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
        this.setState({
          ...this.state,
          ...tempSavedDoc,
        });
        return;
      }
    }

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
      ...editor.state,
      ...this.state,
    });

    subdocLinks.setState(this.state.documents);

    this.render();
  };

  this.render = () => {
    $target.appendChild($pageContainer);

    const $content = $('[name=content]', $target);

    if ($content.value) {
      setTimeout(() => {
        $content.focus();
      }, 0);
      return;
    }

    const $title = $('[name=title]', $target);

    setTimeout(() => {
      $title.focus();
    }, 0);
  };

  $target.appendChild($pageContainer);
}
