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
  }

  this.render()
}
