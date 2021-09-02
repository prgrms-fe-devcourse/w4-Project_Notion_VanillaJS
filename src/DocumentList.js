import { docsTreeToArray } from "./tool.js"
import { request, USERNAME } from "./api.js"
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
    if (this.state && Array.isArray(this.state)) { // 방어코드
      $documentList.innerHTML = `
      ${this.state.map(doc => `
      <li data-id="${doc.id}">${doc.title}
      <button class="removeBtn">삭제</button></li>
     `).join('')}
    `
    }
  }

  this.render()
  
  // 클릭 시 펼침
  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li')
    const { className } = e.target

    if ($li) {
    const { id } = $li.dataset
    onDocsClick = id

    if(className === 'removeBtn'){
      removeDocument(id)
    } else{
      fetchDocument(onDocsClick)

      const originTitle = this.state.filter(obj=>obj.id==id)[0]
      if(originTitle){
        $li.innerHTML = originTitle.title + `
        ${docsTreeToArray(this.state.filter(obj=>obj.id==id)[0].documents).map(doc => `
        <li data-id="${doc.id}" class="spreadTitle">${doc.title}</li>
      `).join('')}
      `}
      }
    }
  })
  
  //  조회하기
  const editor = new Editor({ 
    $target,
    initialState: {
      title: `${USERNAME} 님의 노션페이지`,
      content: '',
      createdAt: '',
      updatedAt: ''
    }
   })
  const fetchDocument = async (id) => {
  const document = await request(`/documents/${id}`,{
    method: 'GET',
  })
  editor.setState(document)
  }

  //삭제하기
  const removeDocument = async (id) => {
    const document = await request(`/documents/${id}`,{
      method: 'DELETE',
    })
  }


  this.render()
}


  

