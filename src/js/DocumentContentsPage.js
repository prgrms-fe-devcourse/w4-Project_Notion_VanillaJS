import Editor from "./Editor.js"
export default function DocumentContentsPage({
  $target,
  initialState,
  onEditing,
  onRemove,
}) {
  const $page = document.createElement("article")
  $page.className = "docPage"
  const $removeButton = document.createElement("button")
  $removeButton.textContent = "문서 삭제"
  $removeButton.className = "removeBtn"
  this.state = initialState
  //page setState
  this.setState = (nextState) => {
    if (nextState.id === "remove" && $target.childNodes[1]) {
      $target.removeChild($page)
      return
    }
    this.state = nextState
    editor.setState(this.state)
    // subDocList.setState(makeSubDocList([this.state], this.state.id, []))
    $page.appendChild($removeButton)
    this.render()
  }
  //editor
  const editor = new Editor({
    $target: $page,
    initialState,
    onEditing,
  })
  // 미완성
  // const subDocList = new SubDocList({
  //   $target: $page,
  //   initialState,
  // })
  this.render = () => {
    if (this.state.id && this.state.id !== "remove") $target.appendChild($page)
  }
  $removeButton.addEventListener("click", () => {
    onRemove(this.state.id)
  })
  this.render()
}
