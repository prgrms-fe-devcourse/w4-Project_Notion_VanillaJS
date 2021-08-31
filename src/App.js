import DocumentEditor from './DocumentEditor.js';
import DocumentList from './DocumentList.js';
import { request } from './api.js';

export default function App({ $target, initialState }) {
  const documentList = new DocumentList({
    $target,
    inititalState: initialState,
    onClick: e => {
      if (e.target.nodeName === 'SPAN') {
        const documentId = e.target.closest('li').dataset.id;
        documentEditor.getDocument(documentId);
      }
    }
  });

  const documentEditor = new DocumentEditor({
    $target,
    initialState: {
      title: '',
      content: '',
      isLoad: true
    }
  });
}
