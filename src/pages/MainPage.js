import Editor from '../components/Editor/index.js'
import LoadingBox from '../components/LoadingBox/index.js'
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

  const loadingBox = new LoadingBox({
    $target: $page,
    initialState: this.state.isSaveLoading,
  })

  this.setState = (nextState) => {
    this.state = nextState
    const { username, documents, document, isSaveLoading } = this.state
    sidebar.setState({
      username,
      documents,
    })
    !isSaveLoading && editor.setState(document)
    loadingBox.setState(isSaveLoading)
  }

  this.render = () => {
    $target.appendChild($page)
  }
}
