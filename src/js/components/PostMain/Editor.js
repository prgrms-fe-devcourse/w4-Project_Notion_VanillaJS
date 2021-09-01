export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div')
  $editor.className = 'editorDiv'
  $target.appendChild($editor)

  let isInitialized = false
  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    $editor.querySelector('[name=title]').value = this.state.title
    $editor.querySelector('[name=content]').value = this.state.content
    this.render()
  }

  this.render = () => {
    if (!isInitialized) {
      $editor.innerHTML = `
        <input type="text" name ="title" class="editorTitle" value="${this.state.title}" placeholder="제목 없음" />
        <textarea name="content" class="editorContent" placeholder="내용을 입력하세요">${this.state.content} </textarea>
      `

      isInitialized = true
    }
  }

  this.render()

  // 이벤트 버블
  $editor.addEventListener('keyup', (e) => {
    const { target } = e
    const name = target.getAttribute('name')
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
        parent: null,
      }

      this.setState(nextState)
      // 여기서 값을 넘겨줍니다.
      onEditing(this.state)
    }
  })
}
