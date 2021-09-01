import { EventUtils } from '../utils/event.js'

export default function DocumentEditor ({ $target, initialState, onEditing }) {
  const $documentEditor = document.createElement('div')
  $documentEditor.classList.add('document-edit')
  
  
  $documentEditor.innerHTML=`
  <input type="text" name="title" style="width:600px;"/>
  <textarea name="content" style="width:600px; height:400px"></textarea>
  `
  this.state = initialState
  
  $target.appendChild($documentEditor)
  
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $documentEditor.querySelector('[name=title]').value = this.state.title
    // innerHTML 아니고 value임!! ㅠㅠㅠ
    $documentEditor.querySelector('[name=content]').value = this.state.content
    
    // appendChild
  }

  this.render()

  $documentEditor.querySelector('[name=title]').addEventListener('input', (event) => {
    const nextState = {
      ...this.state,
      title: event.target.value
    }
    this.setState(nextState)
    
    onEditing(this.state)


    //console.log('keyup!!',this.state)
  })

  $documentEditor.querySelector('[name=content]').addEventListener('keyup', (event) => {
    const nextState = {
      ...this.state,
      content: event.target.value
    }
    this.setState(nextState)
    onEditing(this.state)
    //console.log('keyup!!',this.state)
  })
}