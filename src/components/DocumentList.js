import { makeDocumentTreeTemplate } from '../utils/template.js';
import { checkCorrectTypeThrowError, checkIsArrayThrowError, isEmptyArray } from '../utils/validator.js';
import { fetchDeleteDocument } from '../utils/api.js';
import { movePage } from '../utils/eventListeners.js';
import { checkUseConstructorFunction } from '../utils/validator.js';
import { createElement } from '../utils/dom.js';
import {
  MSG_DOCUMENTS_DOES_NOT_EXIST,
  MSG_CONFIRM_DELETE,
  MSG_ADD_DOCUMENT,
  CLASS_NAME_ROOT_DOCUMENT_ADD_BUTTON,
  CLASS_NAME_DOCUMENT_TREE,
  CLASS_NAME_DOCUMENT_ITEM,
  CLASS_NAME_DOCUMENT_ADD_BUTTON,
  CLASS_NAME_DOCUMENT_DELETE_BUTTON,
  CLASS_NAME_DOCUMENT_LIST,
  CLASS_NAME_LOGO_CONTAINER,
  CLASS_NAME_LOGO_IMAGE,
  CLASS_NAME_MESSAGE_CONTAINER,
} from '../utils/constants.js';

export default function DocumentList({ $target, initialState, onOpenModal }) {
  const validate = state => {
    checkUseConstructorFunction(new.target, DocumentList);
    checkCorrectTypeThrowError(onOpenModal, 'function');
    checkIsArrayThrowError(state);
  };

  validate(initialState);
  this.state = initialState;

  const $documentList = createElement('div');

  $documentList.className = CLASS_NAME_DOCUMENT_LIST;
  $target.appendChild($documentList);

  this.setState = nextState => {
    validate(nextState);
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentList.innerHTML = `
      <div class="${CLASS_NAME_LOGO_CONTAINER}">
        <img class="${CLASS_NAME_LOGO_IMAGE}" src="/src/images/logo.png" alt="logo image" />
        <button class="${CLASS_NAME_ROOT_DOCUMENT_ADD_BUTTON}">
          <i class="fas fa-book-open fa-md"></i> ${MSG_ADD_DOCUMENT}
        </button>
      </div>
      ${
        isEmptyArray(this.state)
          ? `<div class="${CLASS_NAME_MESSAGE_CONTAINER}">${MSG_DOCUMENTS_DOES_NOT_EXIST}</div>`
          : `<ul class="${CLASS_NAME_DOCUMENT_TREE}">${makeDocumentTreeTemplate(this.state)}</ul>`
      }
    `;
  };

  let isInit = false;
  this.init = () => {
    $documentList.addEventListener('click', async e => {
      const {
        target,
        target: { classList, className },
      } = e;

      const $rootDocumentAddButton = target.closest('button');
      const $documentItem = target.closest(`.${CLASS_NAME_DOCUMENT_ITEM}`);

      let documentId = '';
      if ($documentItem) {
        documentId = $documentItem.dataset.id;
      }

      if (classList.contains(CLASS_NAME_DOCUMENT_ADD_BUTTON)) {
        onOpenModal(documentId);
      } else if (classList.contains(CLASS_NAME_DOCUMENT_DELETE_BUTTON)) {
        if (confirm(MSG_CONFIRM_DELETE)) {
          await fetchDeleteDocument(documentId);
          movePage(`/`);
        }
      } else if (className === CLASS_NAME_ROOT_DOCUMENT_ADD_BUTTON || $rootDocumentAddButton) {
        onOpenModal();
      } else if (className === CLASS_NAME_DOCUMENT_ITEM) {
        movePage(`/document/${documentId}`);
      } else if (className === CLASS_NAME_LOGO_IMAGE) {
        movePage(`/`);
      }
    });

    isInit = true;
  };

  if (!isInit) {
    this.init();
  }
}
