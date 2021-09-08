import {
  listItemClasses,
  editorClasses,
  DOCUMENT_NOT_SELECTED_TEXT,
  CHILD_DOCUMENTS_NOT_EXIST_TEXT,
} from '../constants.js'

const renderListItem = (
  { id, title, documents },
  depth = 1,
  isOpen,
  selectedId,
) => {
  const { DOCUMENT, DELETE_BUTTON, ADD_BUTTON, COLLAPSE_BUTTON } =
    listItemClasses

  const isSelected = selectedId === id
  const listItemClass = isSelected
    ? `${DOCUMENT} ${DOCUMENT}--selected`
    : DOCUMENT

  const listItemStyle = `padding-left: ${depth * 14}px;`

  const collapseIcon = isOpen
    ? `<i class="fas fa-caret-down"></i>`
    : `<i class="fas fa-caret-right"></i>`

  const childDocuments =
    documents.length !== 0
      ? `
        <ul class="PageBlock">
          ${documents
            .map((document) => renderListItem(document, depth + 1, true, 1))
            .join('')}
        </ul>
       `
      : ''

  return `
    <li class="${listItemClass}" data-id="${id}" style="${listItemStyle}">
        <div class="PageBlock__column" style="pointer-events: none;">
            <button type="button" style="pointer-events: all;" class="${COLLAPSE_BUTTON}">
                ${collapseIcon}
            </button>
            <span>${title}</span>
        </div>
        <div class="PageBlock__buttons">
            <button class="${DELETE_BUTTON}" type="button">
                <i class="fas fa-trash-alt"></i>
            </button>
            <button class="${ADD_BUTTON}" type="button">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        <li>
        ${childDocuments}
    
    `
}

export const renderDocumentTree = (documents) => {
  const { ADD_BUTTON } = listItemClasses
  const rootDocumentAddTemplate = `
        <li class="${ADD_BUTTON}">
            <i class="fas fa-plus"></i>
            <span> Add a Page </span>    
        </li>
    `

  return `
    <ul class="PageBlock">
        ${documents.map((document) => renderListItem(document)).join('')}
        ${rootDocumentAddTemplate}
    </ul>
    `
}

export const renderEditor = (document) => {
  if (!document) {
    return DOCUMENT_NOT_SELECTED_TEXT
  }

  const { title, content } = document
  const { TITLE, CONTENT } = editorClasses

  return `
    <input class="${TITLE}" type="text" placeholder="제목을 입력하세요" value="${title}"/>
    <div contenteditable class="${CONTENT}">${content ? content : ''}</div>
  `
}

export const renderBottomBar = (documents) => {
  const bottomBarTitle = `
    <div>이 문서의 하위 문서</div>
  `

  if (!documents || documents.length === 0) {
    return `
        ${bottomBarTitle}
        <div>${CHILD_DOCUMENTS_NOT_EXIST_TEXT}</div>
    `
  }

  const { DOCUMENT } = listItemClasses

  return `
    ${bottomBarTitle}
    <ul>
        ${documents
          .map(
            ({ id, title }) =>
              `<li class="${DOCUMENT}" data-id=${id}>${title}</li>`,
          )
          .join('')}
    </ul>`
}
