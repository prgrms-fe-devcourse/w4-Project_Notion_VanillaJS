import { getItem } from "./storage.js"

export const makeList = (documents) => `
  ${documents.map(document => {
    const {id, title, documents} = document
    return `
    <li data-id=${id} class="documents-list"  >
    <div class="item">
      <span class="ontoggle">${getState(id).state === 'block' ? `▼` : `▶`}</span>   
      <span class="document-list">${title.replace(/ /gi, "") ? title : 'Untitled'}</span>
      <span class="btn">
      <button class="add-child">&#43;</button>
      <button class="delete">&#10006;</button>
      </span>
    </div>
      ${documents.length > 0 ? makeChildList(documents, id) : hasNoChild()}
    </li>
      `}).join('')}
`

const getState = (id) => getItem(`temp-toggle-${id}`, '')

const makeChildList = (documents, id) => `
    <ul class="child-${id}" style="display: ${getState(id) ? getState(id).state : 'none'}  " >
      ${makeList(documents)}
    </ul>
  `

const hasNoChild = () => `
    <ul class="emptyChild" style="display: none" >
      <li>No pages inside</li>
    </ul>
 `