import { listItemClasses, editorClasses } from '../../constants.js'
import { debounce } from '../../utils/events.js'
import BottomBar from './BottomBar.js'
import Editor from './Editor.js'

export default function EditorContainer({
  $target,
  initialState,
  onDocumentClick,
  onDocumentEdit,
}) {
  const $editorContainer = document.createElement('div')
  $editorContainer.className = 'EditorContainer'

  $target.appendChild($editorContainer)

  this.state = initialState

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state,
  })

  const bottomBar = new BottomBar({
    $target: $editorContainer,
  })

  this.setState = (nextState) => {
    if (!nextState) {
      return
    }

    this.state = nextState
    editor.setState(this.state)
    bottomBar.setState(this.state.documents)
  }

  const debouncedOnEdit = debounce((e) => {
    const { TITLE, CONTENT } = editorClasses

    const { className } = e.target
    if (className === TITLE || className === CONTENT) {
      const { id } = this.state

      const $title = $editorContainer.querySelector(`.${TITLE}`)
      const title = $title.value

      const $content = $editorContainer.querySelector(`.${CONTENT}`)
      const content = $content.innerHTML

      onDocumentEdit(id, { title, content })
    }
  }, 1000)

  $editorContainer.addEventListener('keyup', debouncedOnEdit)

  $editorContainer.addEventListener('click', (e) => {
    const { className } = e.target
    const { id } = e.target.dataset
    if (className === listItemClasses.DOCUMENT) {
      onDocumentClick(id)
    }
  })
}
