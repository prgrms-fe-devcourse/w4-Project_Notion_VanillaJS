import { editorClasses } from '../../constants.js'
import { renderEditor } from '../../utils/templates.js'

export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $editor.innerHTML = renderEditor(this.state)

    const { TITLE, CONTENT } = editorClasses

    const $title = $editor.querySelector(`.${TITLE}`)
    const $content = $editor.querySelector(`.${CONTENT}`)

    if (this.state?.title === '') {
      $title && $title.focus()
    } else if (this.state?.content == '') {
      $content && $content.focus()
    }
  }
  this.render()
}
