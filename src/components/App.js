import DocumentsPage from './DocumentsPage.js';
import EditorPage from './EditorPage.js';

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({
    $target,
  });

  const editorPage = new EditorPage({
    $target,
    initialState: {
      id: 1,
    },
  });

  this.state = {
    documents: [],
  };

  this.route = () => {
    // documentsPage.render();
    editorPage.render();
  };

  this.route();
}
