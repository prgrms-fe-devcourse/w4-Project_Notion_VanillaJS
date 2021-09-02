
export default function DocumentList({ $target, initialState, onClickDoc, onAddDoc, onDeleteDoc }) {
  const $documentList = document.createElement('ul')
  $documentList.classList.add('document-list')
  $target.appendChild($documentList)

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };


  this.makeTreeTemplate = (rootDocuments, called = 0) => {
    const string = [];
    rootDocuments.forEach((document) => {

      const hasSubDoc = document.documents.length > 0;
      string.push(`
          <li data-id="${document.id}" class="document-list__item">
            <div class="document-list__item__container">
              <span class=${hasSubDoc ? `"caret"` : `"last"`} style="margin-left: ${called * 28}px;">
                <p class="document-list__item__text">${!document.title ? '제목없음': document.title }</p>
              </span>
              <button class="add-btn">+</button>
              <button class="delete-btn">-</button>
            </div>
          ${ hasSubDoc ? `<ul class="nested">${this.makeTreeTemplate(document.documents, ++called)}</ul>` : '' }
          </li>
      `);
      called = 0 
    });
    return string.join('');
  };

  this.render = () => {
    $documentList.innerHTML = this.makeTreeTemplate(this.state);
  };

  this.render()

  $documentList.addEventListener('click', (event) => {
    const $li = event.target.closest('li')
    const $span = event.target.closest('span')
    const { id } = $li.dataset
    const [className, ] = event.target.classList
    console.log(className)
    if (className) {
      switch (className) {
        case 'document-list__item__container' :
          onClickDoc(id)
          break
        case 'document-list__item__text' :
          onClickDoc(id)
          break
        case 'add-btn' :
          onAddDoc(id)
          break
        case 'delete-btn' :
          onDeleteDoc(id)
        case 'caret' :
          if($span) {
            $li.querySelector(".nested").classList.toggle("active");
            $span.classList.toggle("caret-down");
          }
      }
    }
  })



}