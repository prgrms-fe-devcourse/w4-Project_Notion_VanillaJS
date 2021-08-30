import DocumentList from '../components/DocumentList.js';
import { fetchGetDocuments } from '../utils/api.js';
import {
  checkCorrectTypeThrowError,
  checkUseConstructorFunction,
} from '../utils/validator.js';
import { createElement } from '../utils/dom.js';
import { CLASS_NAME_DOCUMENT_PAGE } from '../utils/constants.js';

export default function DocumentsPage({ $target, onOpenModal }) {
  const validate = () => {
    checkCorrectTypeThrowError(onOpenModal, 'function');
    checkUseConstructorFunction(new.target, DocumentsPage);
  };

  validate();

  const $page = createElement('div');

  $page.className = CLASS_NAME_DOCUMENT_PAGE;
  $target.appendChild($page);

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onOpenModal,
  });

  this.setState = async () => {
    const documents = await fetchGetDocuments();
    documentList.setState(documents);
  };
}
