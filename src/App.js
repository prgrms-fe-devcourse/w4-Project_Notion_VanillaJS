import AddRootDocumentButton from './AddRootDocumentButton.js';
import DocumentEditor from './DocumentEditor.js';
import DocumentList from './DocumentList.js';

export default function App({ $target, initialState }) {
  new AddRootDocumentButton({
    $target,
    initialState: {
      title: 'Add New Document'
    },
    onClick: e => {
      if (e.target.className === 'add-new-root-document') {
        setNewDocumentEditor();
      }
    }
  });

  const documentList = new DocumentList({
    $target,
    inititalState: initialState,
    onClick: async e => {
      const { target } = e;
      const { className } = target;
      const documentId = target.closest('li').dataset.id;

      if (className === 'add-document') {
        setNewDocumentEditor(documentId);
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

  const setNewDocumentEditor = async (documentId = null) => {
    const newDoucmentId = await documentList.addDocument(documentId ? +documentId : documentId);
    documentEditor.setState({
      title: '',
      content: '',
      isLoad: true,
      documentId: newDoucmentId
    });
  };
}
