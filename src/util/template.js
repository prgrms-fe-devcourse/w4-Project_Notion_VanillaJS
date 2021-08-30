import {
  CLASS_NAME_DOCUMENT_ADD_BUTTON,
  CLASS_NAME_DOCUMENT_DELETE_BUTTON,
  CLASS_NAME_DOCUMENT_ITEM,
  CLASS_NAME_CHILD_DOCUMENT_LINK,
  CLASS_NAME_LAST_NODE,
  CLASS_NAME_NODE_LABEL,
  CLASS_NAME_DOCUMENT_TREE,
  CLASS_NAME_BUTTON_GROUP,
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
