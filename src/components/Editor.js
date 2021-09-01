import { EventUtils } from '../utils/event.js'

export default function Editor ({ $target, initialState, onEditing }) {
  const $editor = document.createElement('div')
  $editor.classList.add('document-edit')
  
  this.template = `
  <input type="text" name="title" maxlength="30" style="width:600px;"/>
  <textarea name="content" style="width:600px; height:400px"></textarea>
  `
  $target.appendChild($editor)
  $editor.innerHTML = this.template

  this.state = initialState
  
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $editor.querySelector('[name=title]').value = this.state.title
    // innerHTML 아니고 value임!! ㅠㅠㅠ
    $editor.querySelector('[name=content]').value = this.state.content
  }

  this.render()

  $editor.querySelector('[name=title]').addEventListener('input', (event) => {
    const nextState = {
      ...this.state,
      title: event.target.value
    }
    this.setState(nextState)
    
    onEditing(this.state)


    //console.log('keyup!!',this.state)
  })

  $editor.querySelector('[name=content]').addEventListener('keyup', (event) => {
    const nextState = {
      ...this.state,
      content: event.target.value
    }
    this.setState(nextState)
    onEditing(this.state)
    //console.log('keyup!!',this.state)
  })
}