export default function DocumentEditor ({ $target, initialState }) {
  const $documentEditor = document.createElement('div')
  $documentEditor.classList.add('document-edit')
  $target.appendChild($documentEditor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $documentEditor.innerHTML=`
      <input type="text" name="title" style="width:600px;" value="${this.state.title}"/>
      <textarea name="content" style="width:600px; height:400px">${this.state.content}</textarea>
    `
  }

  this.render()
}