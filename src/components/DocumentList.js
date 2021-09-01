
export default function DocumentList({ $target, initialState, onClickDoc, onAddDoc, onDeleteDoc }) {
  const $documentList = document.createElement('div')
  $documentList.classList.add('document-list')
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.makeTreeTemplate = (documents) => {
    const documentTreeString = []

      documents.map((document) => {
        documentTreeString.push(`
        <ul>
          <li data-id="${document.id}" class="document-list__item">
            ${document.title}
            <button class="add-btn">+</button>
            <button class="delete-btn">-</button>
          </li>

          ${document.documents.length > 0 ? this.makeTreeTemplate(document.documents) : ''}

        </ul>
        `)
      })

      return documentTreeString.join('')
  }

  this.render = () => {
    const rootDocuments = this.state
    $documentList.innerHTML = this.makeTreeTemplate(rootDocuments)
  }

  this.render()

  $documentList.addEventListener('click', (event) => {
    const $li = event.target.closest('li')
    const { id } = $li.dataset
    const { className } = event.target

    if (className) {
      switch (className) {
        case 'document-list__item' :
          onClickDoc(id)
          break
        case 'add-btn' :
          onAddDoc(id)
          break
        case 'delete-btn' :
          onDeleteDoc(id)
        
      }
    }
  })

}