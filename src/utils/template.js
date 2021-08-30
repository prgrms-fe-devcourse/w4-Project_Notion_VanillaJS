import { isEmptyArray } from './validator.js';
import {
  CLASS_NAME_DOCUMENT_ADD_BUTTON,
  CLASS_NAME_DOCUMENT_DELETE_BUTTON,
  CLASS_NAME_DOCUMENT_ITEM,
  CLASS_NAME_CHILD_DOCUMENT_LINK,
  CLASS_NAME_LAST_NODE,
  CLASS_NAME_NODE_LABEL,
  CLASS_NAME_DOCUMENT_TREE,
  CLASS_NAME_BUTTON_GROUP,
  CLASS_NAME_MESSAGE_CONTAINER,
  CLASS_NAME_LOGO_CONTAINER,
  MSG_DOCUMENTS_DOES_NOT_EXIST,
  CLASS_NAME_LOGO_IMAGE,
  CLASS_NAME_ROOT_DOCUMENT_ADD_BUTTON,
  MSG_ADD_DOCUMENT,
} from './constants.js';

const makeListTemplate = (id, title, documents, recursive) => {
  return `
  <li class="${CLASS_NAME_DOCUMENT_ITEM}" data-id="${id}">
    <input type="checkbox" id="node-${id}" />
    ${
      documents.length > 0
        ? `<label class="${CLASS_NAME_NODE_LABEL}" for="node-${id}"></label>${title}`
        : `<label class="${CLASS_NAME_NODE_LABEL} ${CLASS_NAME_LAST_NODE}" for="node-${id}"></label>${title}`
    }
    <div class="${CLASS_NAME_BUTTON_GROUP}">
      <i class="${CLASS_NAME_DOCUMENT_ADD_BUTTON} fas fa-plus-square fa-md"></i>
      <i class="${CLASS_NAME_DOCUMENT_DELETE_BUTTON} fas fa-trash-alt fa-md"></i>
    </div>
    ${documents.length > 0 ? `<ul>${recursive(documents)}</ul>` : ''} 
  </li>
`;
};

export const makeDocumentTreeTemplate = list => {
  let resultTemplate = '';

  const recursive = documents => {
    if (documents.length === 0) return '';

    let result = '';
    documents.forEach(({ id, title, documents }) => {
      result += makeListTemplate(id, title, documents, recursive);
    });

    return result;
  };

  list.forEach(({ id, title, documents }) => {
    resultTemplate += makeListTemplate(id, title, documents, recursive);
  });

  return resultTemplate;
};

export const makeChildDocumentLinkTemplate = list => {
  return `
    <ul class="${CLASS_NAME_DOCUMENT_TREE}">
      ${list
        .map(
          ({ id, title }) => `
        <li class="${CLASS_NAME_CHILD_DOCUMENT_LINK}" data-id="${id}">
          <label class="${CLASS_NAME_NODE_LABEL} ${CLASS_NAME_LAST_NODE}" for="node-${id}"></label>${title}
        </li>
      `
        )
        .join('')}
    </ul>
  `;
};

export const makeDocumentList = state => {
  return `
    <div class="${CLASS_NAME_LOGO_CONTAINER}">
      <img class="${CLASS_NAME_LOGO_IMAGE}" src="/src/images/logo.png" alt="logo image" />
      <button class="${CLASS_NAME_ROOT_DOCUMENT_ADD_BUTTON}">
        <i class="fas fa-book-open fa-md"></i> ${MSG_ADD_DOCUMENT}
      </button>
    </div>
    ${
      isEmptyArray(state)
        ? `<div class="${CLASS_NAME_MESSAGE_CONTAINER}">${MSG_DOCUMENTS_DOES_NOT_EXIST}</div>`
        : `<ul class="${CLASS_NAME_DOCUMENT_TREE}">${makeDocumentTreeTemplate(state)}</ul>`
    }
  `;
};
