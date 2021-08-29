import { requestGET, requestPUT } from '../../utils/api.js'

const EDITOR_NAMES = {
  TITLE: 'title',
  CONTENT: 'content',
}

export default function Editor({ $target, initialState, onEdit }) {
  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { title, content } = this.state
    $editor.innerHTML = `
      <input name="${EDITOR_NAMES.TITLE}" type="text" value="${title}"/>
      <textarea name="${EDITOR_NAMES.CONTENT}">${content} </textarea>
    `
  }

  const init = async () => {
    let timer = null
    $editor.addEventListener('keyup', (e) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const { name, value } = e.target
        if (name) {
          switch (name) {
            case EDITOR_NAMES.TITLE:
              this.state.title = value
              // localStorage, setState
              break

            case EDITOR_NAMES.CONTENT:
              this.state.content = value
              //localStorage setSTate
              break
          }

          const { selectedDocumentId, title, content } = this.state

          onEdit(selectedDocumentId, { title, content })
        }
      }, 2000)
    })
  }

  init()
}
