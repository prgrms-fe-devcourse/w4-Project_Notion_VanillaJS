import DocumentList from "./DocumentList.js"
import { request } from "./api.js"

export default function Editor({ $target, initialState, fetchDocument
}) {
  const $editor = document.createElement('div')
  $target.appendChild($editor)
  this.state = initialState

  ondblclick

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
      $editor.innerHTML = `
      <article>
        <div class="editContainer">
          <button class="newBtn">작성하기</button>
          <button class="editBtn">수정하기</button>
        </div>
        <textarea id="newArticleTitle" class="articleTitle"> ${this.state.title}</textarea>
        <div "articleDate">
          <span class="articleCreatedDate">작성: ${this.state.createdAt}</span>
          <span class="articleEditedDate">수정: ${this.state.updatedAt}</span>
        </div>
        <textarea id="newArticleContent" class="articleContent">${this.state.content}</textarea>
      </article>
      <div></div>
    `
  }

  this.render()

  $editor.addEventListener('click', (e) => {
    const { className } = e.target
    
    if(className === 'newBtn'){
      console.log(this.state);
      newDocumentEditor()
    } else if (className === 'createBtn') {
      const newTitle = document.getElementById('newTitle').value
      console.log("creatBtnTest")
      console.log(this.state.id);
      newDocument(newTitle, this.state.id)
    } else if (className === 'editBtn') {
      console.log("test");
      const newArticleTitle = document.getElementById('newArticleTitle').value
      const newArticleContent = document.getElementById('newArticleContent').value
      editDocument(newArticleTitle, newArticleContent, this.state.id)
    }
  }
  )
  
  // 생성 편집기
  const newDocumentEditor = () => {
    $editor.innerHTML = `
    <article>
      <input type="text" class="articleTitle" id="newTitle" placeholder="제목을 입력하세요" />
      <div>
        <button class="createBtn">생성하기</button>
        <button class="cancelBtn">취소</button>
      </div>
    </article>
    `
  }
  
  // 생성 요청
  const newDocument = async (title, id) => {

    const document = await request(`/documents`,{
      method: 'POST',
      body: JSON.stringify({
        'title': title,
        'parent': Number(id),
      })
    })
    console.log(document);
  }

  // 수정
  const editDocument = async (title, content, id) => {
    const document = await request(`/documents/${id}`,{
      method: 'PUT',
      body: JSON.stringify({
        'title': title,
        'content': content
      })
    })
    console.log(document);
  }


  this.render()
}



  

