import Sidebar from './Sidebar.js';
import Editor from './Editor.js';
import { request } from '../api.js';
import { initRouter, push } from '../router.js';
import { getItem, removeItem, setItem } from '../storage.js';

const addToggleAttribute = documents => {
  return documents.map(obj => {
    obj.isToggled = false;
    if (obj.documents.length === 0) {
      return obj;
    }
    addToggleAttribute(obj.documents);
    return obj;
  });
};

const toggleDocument = (rootDocuments, documentId) => {
  return rootDocuments.map(obj => {
    if (obj.id === documentId) {
      obj.isToggled = !obj.isToggled;
      return obj;
    }
    toggleDocument(obj.documents, documentId);
    return obj;
  });
};

export default function App({ $target }) {
  this.state = {
    rootDocuments: []
  };

  this.setState = async () => {
    const documents = await request('/documents/');
    const nextState = addToggleAttribute(documents);

    this.state.rootDocuments = nextState;
    sidebar.setState(nextState);
  };

  this.setState();

  const sidebar = new Sidebar({
    $target,
    intialState: [],
    createList: async id => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '제목 없음',
          parent: id
        })
      });

      push(`/documents/${createdDocument.id}`);
      this.setState();
    },
    showDocument: documentId => {
      push(`/documents/${documentId}`);
    },
    toggleList: ({ rootDocuments, documentId }) => {
      const nextState = toggleDocument(rootDocuments, documentId);
      sidebar.setState(nextState);
    },
    deleteList: async documentId => {
      await request(`/documents/${documentId}`, {
        method: 'DELETE'
      });

      const nextState = await request('/documents', {
        method: 'GET'
      });

      sidebar.setState(nextState);
      editor.setState(null);
      push('/');
    }
  });

  // Editor에서 onEditSave 중 에러 발생 대비
  const editingDocument = getItem({
    key: 'temp-document-new',
    defaultValue: {
      id: 'new',
      title: '제목 없음',
      content: ''
    }
  });

  // onEditSave 중 debounce를 위한 초기값
  let timer = null;

  const editor = new Editor({
    $target,
    initialState: editingDocument,
    onEditSave: async ({ id, title, content }) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      if (id !== 'new') {
        // 기존 문서를 수정하는 경우
        const currentDocument = await request(`/documents/${id}`, {
          method: 'GET'
        });

        title = title ?? currentDocument.title;
        content = content ?? currentDocument.content;
      } else {
        // 새로운 문서를 생성하는 경우
        title = title ?? editingDocument.title;
        content = content ?? editingDocument.content;
      }

      const localSaveKey = `temp-document-${id}`;

      timer = setTimeout(async () => {
        setItem({
          key: localSaveKey,
          value: {
            title,
            content,
            updatedAt: new Date()
          }
        });

        // 기존 문서를 수정하는 경우
        if (id !== 'new') {
          const modifiedDocument = await request(`/documents/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title,
              content
            })
          });

          if (modifiedDocument) {
            removeItem({ key: localSaveKey });
            this.setState();
          } else {
            alert('저장 중 에러가 발생했습니다.');
          }
          return;
        }

        // 새로운 문서를 생성하는 경우
        const createdDocument = await request(`/documents`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            parent: null
          })
        });

        const modifiedDocument = await request(
          `/documents/${createdDocument.id}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              title,
              content
            })
          }
        );

        if (modifiedDocument) {
          push(`/documents/${createdDocument.id}`);
          removeItem({ key: localSaveKey });
          this.setState();
        } else {
          alert('저장 중 에러가 발생했습니다.');
        }
      }, 2000);
    }
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');

      editor.setState({
        ...editor.state,
        id: documentId
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
