export default function Editor({
  $target,
  initialState,
  onEditing
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

  $editor.addEventListener('keyup', e => {
    const {target} = e
    const name = target.getAttribute('name')
    console.log('target :>> ', target);
    console.log('name :>> ', name);
    //js 특성상 []사이가 빈 문자열이면 false로 인식함
    if (this.state[name] !== undefined) {
      const nextState = {
          ...this.state,
        [name] : target.value
      }
      this.state = nextState
      console.log('this.state :>> ', this.state);
      onEditing(this.state)
    }
  })
};
