import { makeDocumentList, makeLogoContainer } from '../utils/template.js';
import { checkCorrectTypeThrowError, checkIsArrayThrowError } from '../utils/validator.js';
import { fetchDeleteDocument } from '../utils/api.js';
import { movePage } from '../utils/eventListeners.js';
import { checkUseConstructorFunction } from '../utils/validator.js';
import { createElement } from '../utils/dom.js';
import { CLASS_NAME, MESSAGE } from '../utils/constants.js';

export default function DocumentList({ $target, initialState, onOpenModal }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentList);
    checkCorrectTypeThrowError(onOpenModal, 'function');
    checkIsArrayThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $documentList = createElement('div');
  const $logoContainer = createElement('div');
  const $documentTree = createElement('ul');

  $documentList.className = CLASS_NAME.DOCUMENT_LIST;
  $logoContainer.className = CLASS_NAME.LOGO_CONTAINER;
  $documentTree.className = CLASS_NAME.DOCUMENT_TREE;

  $documentList.appendChild($logoContainer);
  $documentList.appendChild($documentTree);
  $target.appendChild($documentList);

  this.setState = nextState => {
    validate(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $logoContainer.innerHTML = makeLogoContainer();
    $documentTree.innerHTML = makeDocumentList(this.state);
  };

  let isInit = false;
  this.init = () => {
    $logoContainer.addEventListener('click', e => {
      const { classList } = e.target;
      const mainClassName = classList[0];

      switch (mainClassName) {
        case CLASS_NAME.FA_BOOK_OPEN:
        case CLASS_NAME.ROOT_DOCUMENT_ADD_BUTTON:
          onOpenModal();
          break;

        case CLASS_NAME.LOGO_IMAGE:
          movePage(`/`);
          break;

        default:
          break;
      }
    });

    $documentTree.addEventListener('click', async e => {
      const {
        target,
        target: { classList },
      } = e;
      const mainClassName = classList[0];
      const $documentItem = target.closest(`.${CLASS_NAME.DOCUMENT_ITEM}`);

      let documentId = '';
      if ($documentItem) {
        documentId = $documentItem.dataset.id;
      }

      switch (mainClassName) {
        case CLASS_NAME.DOCUMENT_ADD_BUTTON:
          onOpenModal(documentId);
          break;

        case CLASS_NAME.DOCUMENT_DELETE_BUTTON:
          if (confirm(MESSAGE.CONFIRM_DELETE)) {
            await fetchDeleteDocument(documentId);
            history.replaceState(null, null, '/');
            movePage(`/`);
          }
          break;

        case CLASS_NAME.DOCUMENT_ITEM:
          movePage(`/document/${documentId}`);
          break;

        default:
          break;
      }
    });

    isInit = true;
  };

  if (!isInit) {
    this.init();
  }
}
