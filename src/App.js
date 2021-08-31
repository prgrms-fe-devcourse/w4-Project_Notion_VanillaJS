import DocumentEditor from './DocumentEditor.js';
import DocumentList from './DocumentList.js';
import { request } from './api.js';

export default function App({ $target, initialState }) {
  const documentList = new DocumentList({
    $target,
    inititalState: initialState,
    onClick: e => {
      const target = e.target;
      const documentId = target.closest('li').dataset.id;

      if (target.nodeName === 'SPAN') {
        documentEditor.getDocument(documentId);
      } else if (target.nodeName === 'BUTTON') {
        documentList.addDocument(+documentId);
        documentEditor.setState({ title: '', content: '', isLoad: true, documentId: documentId });
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
}
