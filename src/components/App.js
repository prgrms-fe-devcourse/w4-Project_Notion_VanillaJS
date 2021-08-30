import DocumentsPage from './DocumentsPage.js';

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({
    $target,
  });

  this.state = {
    documents: [],
  };

  this.route = () => {
    documentsPage.render();
  };

  this.route();
}
