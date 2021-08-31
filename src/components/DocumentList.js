export default function DocumentList({ $target, initialState, onClickList, onAddList }) {
  const $documentList = document.createElement('div')
  $documentList.classList.add('document-list')
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const rootDocuments = this.state

    function makeDocumentTree(documents) {
      const documentTreeString = []
      documents.map((document) => {
        documentTreeString.push(`
        <ul>
          <li data-id="${document.id}">
            -${document.title}
            <button>+</button>
          </li>
          ${document.documents.length > 0 ? makeDocumentTree(document.documents) : ''}
        </ul>
        `)
      })

      return documentTreeString.join('')
    }

    $documentList.innerHTML = makeDocumentTree(rootDocuments)
  }

  this.render()

  $documentList.addEventListener('click', (event) => {
    const $li = event.target.closest('li')
    const $button = event.target.closest('button')
    
    if (event.target.localName !== 'button' && $li) {
      const { id } = $li.dataset

      onClickList(id)
      
    } else if ($button) {
      const { id } = $li.dataset

      onAddList(id)
    }
  })

}