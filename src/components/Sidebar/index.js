import DocumentTree from './DocumentTree.js'
import Header from './Header.js'
/*
{
    documents,
    username
}
*/
export default function Sidebar({
  $target,
  initialState,
  onDocumentClick,
  onDocumentDelete,
  onDocumentAdd,
}) {
  const $sidebar = document.createElement('div')
  $sidebar.className = 'Sidebar'

  $target.appendChild($sidebar)
  this.state = initialState

  new Header({
    $target: $sidebar,
    initialState: this.state.username,
  })

  const documentTree = new DocumentTree({
    $target: $sidebar,
    initialState: this.state.documents,
    onDocumentClick,
    onDocumentDelete,
    onDocumentAdd,
  })

  this.setState = (nextState) => {
    this.state = nextState
    documentTree.setState(this.state.documents)
  }
}
