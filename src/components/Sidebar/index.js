import { listItemClasses } from '../../constants.js'
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
  })

  this.setState = (nextState) => {
    this.state = nextState
    documentTree.setState(this.state.documents)
  }

  $sidebar.addEventListener('click', (e) => {
    const { DOCUMENT, DELETE_BUTTON, ADD_BUTTON, COLLAPSE_BUTTON } =
      listItemClasses

    const { className } = e.target

    switch (className) {
      case DOCUMENT: {
        const $li = e.target.closest('li')
        const { id } = $li.dataset
        onDocumentClick(Number(id))

        break
      }
      case DELETE_BUTTON: {
        const $li = e.target.closest('li')
        const { id } = $li.dataset
        onDocumentDelete(Number(id))
        break
      }
      case ADD_BUTTON: {
        const $li = e.target.closest('li')

        if ($li) {
          const { id } = $li.dataset
          onDocumentAdd(Number(id))
        } else {
          onDocumentAdd(null)
        }
        break
      }
      case COLLAPSE_BUTTON: {
        const $li = e.target.closest('li')
        const $ul = $li.nextElementSibling
        if ($ul) {
          $ul.classList.toggle('none')
        }
        break
      }
    }
  })
}
