import Editor from '../components/Editor/index.js'
import Sidebar from '../components/Sidebar/index.js'

export default function MainPage({
  $target,
  initialState,
  onDocumentClick,
  onDocumentAdd,
  onDocumentDelete,
  onDocumentEdit,
}) {
  const $page = document.createElement('div')
  $page.className = 'MainPage'

  this.state = initialState

  const sidebar = new Sidebar({
    $target: $page,
    initialState: {
      username: this.state.username,
      documents: this.state.documents,
    },
    onDocumentClick,
    onDocumentDelete,
    onDocumentAdd,
  })

  const editor = new Editor({
    $target: $page,
    document: this.state.document,
    onDocumentClick,
    onDocumentEdit,
  })

  this.setState = (nextState) => {
    this.state = nextState
    const { username, documents, document } = this.state
    sidebar.setState({
      username,
      documents,
    })
    editor.setState(document)
  }

  this.render = () => {
    $target.appendChild($page)
  }
}
