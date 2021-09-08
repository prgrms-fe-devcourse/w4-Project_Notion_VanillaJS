import { renderDocumentTree } from '../../utils/templates.js'
import { listItemClasses } from '../../constants.js'

export default function DocumentTree({ $target, initialState }) {
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

  this.render()
}
