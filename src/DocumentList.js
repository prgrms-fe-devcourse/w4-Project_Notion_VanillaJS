import { docsTreeToArray } from "./tool.js"
import { USERNAME } from "./api.js"
import { push } from "./router.js"

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
      <h2 class="mainLogo">${USERNAME}의 페이지 목록 📚</h2>
      ${this.state.map(doc => `
      <li data-id="${doc.id}" ${doc.documents.length ? `class="parentFolder"`:''}>${doc.title}
      <button class="removeBtn">삭제</button></li>
     `).join('')}
    `
    }
  }
  
  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    const { className } = e.target
    
    if (className === 'mainLogo'){ // 메인로고 클릭 시 홈화면으로 이동
      push('/')
    }

    if ($li) {
      const { id } = $li.dataset
      onDocsClick(id, {className}, this.state)

    // 접기버튼
    if (className === 'foldupBtn') {
      const originTitle = docsTreeToArray(this.state).filter(obj=>obj.id==id)[0]
      $li.innerHTML = `${originTitle.documents.length ? `<strong>${originTitle.title}</strong>`:originTitle.title} <button class="removeBtn">삭제</button>`
    } else{ // 클릭 시 펼침
      const originTitle = docsTreeToArray(this.state).filter(obj=>obj.id==id)[0]
      if(originTitle){
        $li.innerHTML = `${originTitle.documents.length ? `<strong>${originTitle.title}</strong>`:originTitle.title} <button class="removeBtn">삭제</button>${originTitle.documents.length ? `<button class="foldupBtn" >접기</button>` : ''}
        ${originTitle.documents.map(doc => `
        <li data-id="${doc.id}" class="spreadTitle ${doc.documents.length ? "parentFolder" : ""}">${doc.title} <button class="removeBtn">삭제</button></li>
      `).join('')}
      `}
      }
    }
  })


  this.render()
}
