import { renderDocumentTree } from '../../utils/templates.js'
import { listItemClasses } from '../../constants.js'

export default function DocumentTree({
  $target,
  initialState,
  onDocumentClick,
  onDocumentAdd,
  onDocumentDelete,
}) {
  const $documentTree = document.createElement('div')

  $target.appendChild($documentTree)

  this.state = initialState || []

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $documentTree.innerHTML = renderDocumentTree(this.state)
  }

  $documentTree.addEventListener('click', (e) => {
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
    }
  })

  this.render()
}
