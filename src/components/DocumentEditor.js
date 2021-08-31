import { setItem, getItem } from '../storage.js'
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
    $documentEditor.querySelector('[name=content]').innerHTML = this.state.content
    
    // appendChild
  }

  this.render()

  $documentEditor.querySelector('[name=title]').addEventListener('keyup', (event) => {
    const nextState = {
      ...this.state,
      title: event.target.value
    }
    this.setState(nextState)
    console.log('keyup!!',this.state)

    onEditing(this.state)
  })

  $documentEditor.querySelector('[name=content]').addEventListener('input', (event) => {
    const nextState = {
      ...this.state,
      content: event.target.value
    }
    this.setState(nextState)
    /*
    const KeyLocalDocument = `temp-document`

    const localSavedDocument = getItem(KeyLocalDocument, {
      ...this.state
    })
    
    setItem(KeyLocalDocument, {
      ...localSavedDocument,
      tempSaveDate: new Date()
     })
     */
    onEditing(this.state)
    console.log('keyup!!',this.state)
  })
}