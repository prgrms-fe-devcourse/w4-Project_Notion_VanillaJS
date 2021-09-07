import { docsTreeToArray } from "./tool.js"
import { request, USERNAME } from "./api.js"
import { push, initRouter } from "./router.js"
import Editor from "./Editor.js"

export default function DocumentList({ $target, initialState, onDocsClick }) {
  const $documentList = document.createElement('div')
  $documentList.classList = "sideBar"
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    if (this.state && Array.isArray(this.state)) {
      $documentList.innerHTML = `
      <h2>${USERNAME}의 페이지 목록 📚</h2>
      ${this.state.map(doc => `
      <li data-id="${doc.id}">${doc.title}
      <button class="removeBtn">삭제</button></li>
     `).join('')}
    `
    }
  }
  
  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    const { className } = e.target
    
    if ($li) {
      const { id } = $li.dataset
      onDocsClick(id, {className}, this.state)

    // 접기버튼
    if (className === 'foldupBtn') {
      const originTitle = docsTreeToArray(this.state).filter(obj=>obj.id==id)[0]
      $li.innerHTML = `${originTitle.title} <button class="removeBtn">삭제</button>`
    } else{ // 클릭 시 펼침
      const originTitle = docsTreeToArray(this.state).filter(obj=>obj.id==id)[0]
      if(originTitle){
        $li.innerHTML = `${originTitle.title} <button class="removeBtn">삭제</button>${originTitle.documents.length ? `<button class="foldupBtn" >접기</button>` : ''}
        ${originTitle.documents.map(doc => `
        <li data-id="${doc.id}" class="spreadTitle">${doc.title} <button class="removeBtn">삭제</button></li>
      `).join('')}
      `}
      }
    }
  })
    
  this.render()
}
