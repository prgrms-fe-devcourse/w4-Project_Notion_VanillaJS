import DocumentEditor from './DocumentEditor.js';
import DocumentList from './DocumentList.js';
import { request } from './api.js';

export default function App({ $target, initialState }) {
  const documentList = new DocumentList({
    $target,
    inititalState: initialState,
    onClick: async e => {
      const { target } = e;
      const { className } = target;
      const documentId = target.closest('li').dataset.id;

      if (className === 'add-document') {
        const newDoucmentId = await documentList.addDocument(+documentId);
        documentEditor.setState({
          title: '',
          content: '',
          isLoad: true,
          documentId: newDoucmentId
        });
      } else if (className === 'delete-document') {
        documentList.deleteDocument(+documentId);
      }
    }
  });

  const documentEditor = new DocumentEditor({
    $target,
    initialState: {
      title: '',
      content: '',
      isLoad: true,
      documentId: ''
    }
  });

  this.render = () => {
    const { pathname } = location;

    if (pathname === '/') {
      documentList.fetchDocument();
      documentEditor.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const documentId = pathname.split('/')[2];
      documentEditor.getDocument(documentId);
    }
  };

  window.addEventListener('click', e => {
    if (e.target.className === 'document') {
      const href = e.target.closest('li').dataset.id;
      history.pushState(null, null, `/documents/${href}`);

      e.preventDefault();

      this.render();
    }
  });

  this.render();
}
