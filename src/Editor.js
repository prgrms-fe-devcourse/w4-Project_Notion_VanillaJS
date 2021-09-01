export default function Editor ({ $target, initialState }) {
  
  const $editor = document.createElement('div')
  $target.appendChild($editor)
  
  this.state = initialState
  
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    if(document.querySelector('article')) {
      document.querySelector('article').remove()
    }
    $editor.innerHTML = `
      <article data-id="${this.state.id}">
        <textarea class="articleTitle">제목: ${this.state.title}</textarea>
        <div class="articleDate">
          <span class="make">작성: ${this.state.createdAt}</span> 
          <span class="edit">수정: ${this.state.updatedAt}</span>
        </div>
        <textarea class="articleContent">${this.state.content}</textarea>
      </article>
    ` 
  }
  this.render()
}

