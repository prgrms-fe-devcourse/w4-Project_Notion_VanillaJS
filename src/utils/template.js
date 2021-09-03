import { isEmptyArray } from './validator.js';
import { CLASS_NAME, MESSAGE, GENERAL } from './constants.js';

const makeListTemplate = (id, title, documents, recursive) => {
  return `
  <li class="${CLASS_NAME.DOCUMENT_ITEM}" data-id="${id}">
    <input type="checkbox" id="node-${id}" />
    ${
      documents.length > 0
        ? `<label class="${CLASS_NAME.NODE_LABEL}" for="node-${id}"></label>${title}`
        : `<label class="${CLASS_NAME.NODE_LABEL} ${CLASS_NAME.LAST_NODE}" for="node-${id}"></label>${title}`
    }
    <div class="${CLASS_NAME.BUTTON_GROUP}">
      <i class="${CLASS_NAME.DOCUMENT_ADD_BUTTON} ${CLASS_NAME.FAS} ${CLASS_NAME.ADD_ICON} ${CLASS_NAME.FA_MD}"></i>
      <i class="${CLASS_NAME.DOCUMENT_DELETE_BUTTON} ${CLASS_NAME.FAS} ${CLASS_NAME.TRASH_ICON} ${
    CLASS_NAME.FA_MD
  }"></i>
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
    
      ${list
        .map(
          ({ id, title }) => `
        <div class="${CLASS_NAME.CHILD_DOCUMENT_LINK}" data-id="${id}">
          ${title}
        </div>
      `
        )
        .join('')}
    
  `;
};

export const makeDocumentList = state => {
  return `${
    isEmptyArray(state)
      ? `<div class="${CLASS_NAME.MESSAGE_CONTAINER}">${MESSAGE.DOCUMENTS_DOES_NOT_EXIST}</div>`
      : `${makeDocumentTreeTemplate(state)}`
  }`;
};

export const makeLogoContainer = () => {
  return `
      <img class="${CLASS_NAME.LOGO_IMAGE}" src="${GENERAL.LOGO_IMAGE_SRC}" alt="logo image" />
      <button class="${CLASS_NAME.ROOT_DOCUMENT_ADD_BUTTON}">
        <i class="${CLASS_NAME.FAS} ${CLASS_NAME.BOOK_ICON} ${CLASS_NAME.FA_MD}"></i> ${MESSAGE.ADD_DOCUMENT}
      </button>
  `;
};
