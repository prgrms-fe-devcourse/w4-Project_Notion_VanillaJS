import { getItem } from "../src/storage.js"

export const makeList = (documents) => `
  ${documents.map(document => {
    const {id, title, documents} = document
    return `
    <li data-id=${id} class="documents-list"  >
    <div class="item" style="display: '' ">
      <span class="ontoggle"> 	&#10148;  </span>   
      <span class="document-list">${title}</span>
      <button class="add-child">&#43;</button>
      <button class="delete">&#10006;</button>
    </div>
      ${documents.length > 0 ? childrenMakeList(documents) : noChild()}
    </li>
      `}).join('')}
`
// style 코드 정리
// 코드정리
const getState = (i) => {
  const cc = getItem(`temp-toggle-${i}`, '')
  return cc ? cc.state : ''
}

let i = 0
const childrenMakeList = (documents) =>{
  i++
  return `
  <ul class="child-${i}" style="display: ${getState(i) ? 'none' : ''}  " >
  ${makeList(documents)}
  </ul>
`}

const noChild = () => `
    <ul class="emptyChild" style="display: none" >
      <li>No pages inside</li>
    </ul>
 `