export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div")
  $editor.className = "editor"
  $editor.innerHTML = `
	<input id="docTitle" type="text" name="title" placeholder="제목을 입력하세요." />
	<textarea id="docContent" name="content" placeholder="내용을 입력하세요"></textarea>
	`

  this.state = initialState
  $target.appendChild($editor)
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $editor.querySelector("[name=title]").value = this.state.title
    $editor.querySelector("[name=content]").value = this.state.content
  }
  $editor.addEventListener("keyup", (e) => {
    const $titleInput = $editor.querySelector("input")
    const $contentTextArea = $editor.querySelector("textarea")
    const nextState = {
      ...this.state,
      title: $titleInput.value,
      content: $contentTextArea.value,
    }
    this.setState(nextState)
    onEditing(this.state)
  })
}
