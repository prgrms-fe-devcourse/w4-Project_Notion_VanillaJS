
export default function DocumentList({ $target, initialState, onClickDoc, onAddDoc, onDeleteDoc }) {
  const $documentList = document.createElement('div')
  $documentList.classList.add('document-list')
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.makeTreeTemplate = (_documents) => {
    const documentTreeString = []
    
    documentTreeString.push(
      `<ul class="tree">
        <li>
          <ul>
        `
    )
      const makeTreeTem = (documents) => {
        const string = []
        documents.map((document, i) => {
          /*
          documentTreeString.push(`
          
            <li data-id="${document.id}" class="document-list__item">
              <input type="checkbox">
              <label class="document-list__item__label${document.documents.length === 0 ?  ` lastTree` : ''}">${document.title}</label>
              <button class="add-btn">+</button>
              <button class="delete-btn">-</button>
            </li>
  
            ${document.documents.length > 0 ? this.makeTreeTemplate(document.documents) : ''}
          `)*/
          const len = document.documents.length
          string.push(`
          <li data-id="${document.id}" class="document-list__item">
          
            <input type="checkbox" id="${document.id}">
            <label class="${len === 0 ? `lastTree` : ''}" for="${document.id}"></label>
            <p class="document-list__item__text">${document.title}</p>
            <button class="add-btn">+</button>
            <button class="delete-btn">-</button>
          
          ${len > 0 ? '<ul>' : ''}
          ${len > 0 ? makeTreeTem(document.documents) : ''}
          ${len > 0 ? '</ul>' : ''}
          </li>
          
          `)
        })
        return string.join('')
      }

      const str = makeTreeTem(_documents)
      documentTreeString.push(str)
      documentTreeString.push('</ul></li></ul>')
      return documentTreeString.join('')
  }

  this.render = () => {
    const rootDocuments = this.state
    $documentList.innerHTML = this.makeTreeTemplate(rootDocuments)
  }

  this.render()

  $documentList.addEventListener('click', (event) => {
    console.log(event.target)
    const $li = event.target.closest('li')
    console.log($li)
    const { id } = $li.dataset
    const [className, ] = event.target.classList
    console.log(className)
    if (className) {
      switch (className) {
        case 'document-list__item__text' :
          console.log()
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