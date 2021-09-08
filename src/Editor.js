import { request } from './api.js'
import { push } from './router.js'

export default function Editor({ $target, initialState, documentEditing
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
        </div>
        <textarea id="newArticleTitle" class="articleTitle"> ${this.state.title}</textarea>
        <div "articleDate">
          <span class="articleCreatedDate">${this.state.createdAt ? '작성: ' + this.state.createdAt.slice(0,10) : ''}</span>
          <span class="articleEditedDate">${this.state.createdAt ? '수정: ' + this.state.updatedAt.slice(0,10) : ''}</span>
        </div>
        <textarea id="newArticleContent" class="articleContent">${this.state.content}</textarea>
      </article>
      <div></div>
    `
  }

  this.render()

  $editor.addEventListener('keyup', (e) => {
    if(document.getElementById('newArticleTitle')){
      const newArticleTitle = document.getElementById('newArticleTitle').value
      const newArticleContent = document.getElementById('newArticleContent').value
      editDocument(newArticleTitle, newArticleContent, this.state.id)
    }
  })

  $editor.addEventListener('click', (e) => {
    const { className } = e.target
    
    if(className === 'newBtn'){
      console.log(this.state);
      newDocumentEditor()
    } else if (className === 'createBtn') {
      const newTitle = document.getElementById('newTitle').value
      
      if(newTitle){
        documentEditing(newTitle, this.state.id)
      } else alert('제목을 입력하세요')
    } else if (className === 'cancelBtn'){
      push('/')
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

  // 문서 수정
  const editDocument = async (title, content, id) => {
    const document = await request(`/documents/${id}`,{
      method: 'PUT',
      body: JSON.stringify({
        'title': title,
        'content': content
      })
    })
  }

  this.render()
}
