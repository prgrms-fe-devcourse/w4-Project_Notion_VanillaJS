import BottomBar from './BottomBar.js'
import { requestGET } from '/src/utils/api.js'

const DOCUMENT_NOT_SELECTED_TEXT = '선택된 문서가 없습니다.'

const editorClassNames = {
  TITLE: 'Editor__title',
  CONTENT: 'Editor__content',
}

export default function Editor({ $target, initialState, onEdit }) {
  let isInit = false

  const $editor = document.createElement('div')
  $editor.className = 'Editor'

  $target.appendChild($editor)

  this.state = initialState

  const bottomBar = new BottomBar({
    $target,
  })

  this.setState = async (nextState) => {
    const { selectedDocumentId } = nextState

    if (selectedDocumentId && selectedDocumentId !== 'new') {
      const selectedDocument = await requestGET(
        `/documents/${selectedDocumentId}`,
      )

      const { title, content, documents, createdAt, updatedAt } =
        selectedDocument

      this.state = {
        selectedDocumentId,
        title,
        content,
        documents,
        createdAt,
        updatedAt,
      }

      bottomBar.setState(documents)

      this.render()
    }
  }

  this.render = () => {
    const { selectedDocumentId, title, content } = this.state
    $editor.innerHTML = selectedDocumentId
      ? `
      <input class="${editorClassNames.TITLE}" type="text" placeholder="Title" value="${title}"/>
      <div contenteditable class="${editorClassNames.CONTENT}">${content}</div>
    `
      : DOCUMENT_NOT_SELECTED_TEXT
  }

  const init = async () => {
    let timer = null
    $editor.addEventListener('keyup', (e) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const { className, value } = e.target
        if (className) {
          switch (className) {
            case editorClassNames.TITLE:
              this.state.title = value
              // localStorage, setState
              break

            case editorClassNames.CONTENT:
              this.state.content = e.target.innerHTML
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
  this.render()
}
