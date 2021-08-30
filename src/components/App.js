import DocumentEditPage from '../pages/DocumentEditPage.js';
import DocumentsPage from '../pages/DocumentsPage.js';
import CreateDocumentModal from './CreateDocumentModal.js';
import { initRouter, initBrowserRouter, initEditorDataChangedListener } from '../utils/eventListeners.js';
import { checkUseConstructorFunction } from '../utils/validator.js';
import { fetchAddDocuments } from '../utils/api.js';
import { movePage } from '../utils/eventListeners.js';

export default function App({ $target }) {
  const validate = () => {
    checkUseConstructorFunction(new.target, App);
  };

  validate();

  const documentsPage = new DocumentsPage({
    $target,
    onOpenModal: (id = null) => {
      createDocumentModal.setState({ id, title: '' });
    },
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: 'new',
  });

  const createDocumentModal = new CreateDocumentModal({
    $target,
    onTitleChange: async ({ id, title }) => {
      const body = {
        title,
        parent: id,
      };

      const { id: createdId } = await fetchAddDocuments(body);

      if (createdId) {
        movePage(`/document/${createdId}`);
        documentsPage.setState();
      }
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      documentEditPage.clear();
      documentsPage.setState();
    } else if (pathname.indexOf('/document/') === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState(documentId);
    }
  };

  this.init = () => {
    this.route();
    documentsPage.setState();
    initRouter(this.route);
    initBrowserRouter(this.route);
    initEditorDataChangedListener(() => documentsPage.setState());
  };

  this.init();
}
