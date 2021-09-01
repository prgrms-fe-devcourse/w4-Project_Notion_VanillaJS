import { request } from "./api.js"


export default function Editor ({ $target, initialState, onDocsClick }) {
  
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
        <h3>제목: ${this.state.title}</h3>
        <div>${this.state.content}</div>
        <div>작성일: ${this.state.createdAt} 수정: ${this.state.createdAt}</div>
      </article>
    ` 
  }
  this.render()
}