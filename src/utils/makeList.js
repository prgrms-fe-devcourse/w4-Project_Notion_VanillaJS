import { getItem } from "./storage.js"

export const makeList = (documents) => `
  ${documents.map(document => {
    const {id, title, documents} = document
    return `
    <li data-id=${id} class="documents-list"  >
    <div class="item">
      <span class="ontoggle">▶</span>   
      <span class="document-list">${title.replace(/ /gi, "") ? title : 'Untitled'}</span>
      <button class="add-child">&#43;</button>
      <button class="delete">&#10006;</button>
    </div>
      ${documents.length > 0 ? makeChildList(documents, id) : hasNoChild()}
    </li>
      `}).join('')}
`
// style 코드 정리
// 코드정리
const getState = (id) => {
  const hasState = getItem(`temp-toggle-${id}`, '')
  return hasState ? hasState.state : 'none'
}


const makeChildList = (documents, id) => `
    <ul class="child-${id}" style="display: ${getState(id)}  " >
      ${makeList(documents)}
    </ul>
  `

const hasNoChild = () => `
    <ul class="emptyChild" style="display: none" >
      <li>No pages inside</li>
    </ul>
 `