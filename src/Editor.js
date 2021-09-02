export default function Editor({
  $target,
  initialState
}) {
  const $editor = document.createElement('div')
  $editor.className = 'doc-page-editor'
  $target.appendChild($editor)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $editor.innerHTML = `
      <input type="text" name="title" value ="${this.state.title}"/>
      <textarea name="content" placeholder="내용을 입력해주세요">${this.state.content? this.state.content : ''}</textarea>
    `
  }
};
