export default function Navigation({
                                     $target,
                                     initialState,
                                     onClickTitle,
                                     onClickPlus,
                                     onClickDel,
                                     onClickAddPage
                                   }) {
  /**
   * initialState={
   *    documentTree:[]
   * }
   */
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };


  const $navPage = document.createElement("div");
  $navPage.setAttribute("id", "nav-page");
  $target.appendChild($navPage);


  this.render = () => {
    const {documentTree} = this.state;
    $navPage.innerHTML = `
		${renderDocumentTree(documentTree)}
		`

    const $carots = document.querySelectorAll('.doc-carot')
    $carots.forEach(carot => {
      carot.addEventListener('click', () => {
        carot.classList.toggle('open')
      })
    })


    const $btnAddPage = document.createElement('button')
    $btnAddPage.setAttribute('class', 'add-page')
    $btnAddPage.innerText = "+ 새 페이지"
    $navPage.appendChild($btnAddPage)
  }
  this.render();


  $navPage.addEventListener('click', (e) => {
    const $docRow = e.target.closest('.doc-row')
    const $docCarot = e.target.closest('.doc-carot')
    const $docTitle = e.target.closest('.doc-title')
    const $docPlusButton = e.target.closest('.doc-plusButton')
    const $docDelButton = e.target.closest('.doc-delButton')
    const $addPageButton = e.target.closest('.add-page')

    if ($docCarot) {
      const _id = $docRow.id.substr(3)

      const $subDocs = document.querySelector(`#sub${_id}`)
      if ($docCarot.classList.contains('open')) {
        $docCarot.innerHTML = `<i class="fas fa-caret-down"></i>`
        $subDocs.style.display = 'block'
      } else {
        $docCarot.innerHTML = `<i class="fas fa-caret-right"></i>`
        $subDocs.style.display = 'none'

      }
    } else if ($docTitle) {
      const _id = $docTitle.id
      onClickTitle($docTitle, _id)
    } else if ($docPlusButton) {
      onClickPlus($docPlusButton)
    } else if ($addPageButton) {
      onClickAddPage($navPage)
    } else if ($docDelButton) {
      onClickDel($docDelButton)
    } else {
      console.log('blank space')
    }

  })
}
const NO_PAGE = `<span style="color:gray;position: relative;left: 25px">하위 페이지가 없습니다</span>`

function renderDocumentTree(documents) {
  if (documents.length === 0)
    return NO_PAGE
  return `
      <ul class="doc-ul" >
        ${documents.map(doc => `
          <div class="doc-row" id="row${doc.id}">
            <span class="doc-carot" id="${doc.id}"><i class="fas fa-caret-right"></i></span>
            <span class="doc-title" id="${doc.id}">${doc.title}</span>
            <button class="doc-delButton" id="delBtn${doc.id}">x</button>
            <button class="doc-plusButton" id="plusBtn${doc.id}" >+</button>
          </div>
          <li id="sub${doc.id}" style="display: none">${renderDocumentTree(doc.documents)}</li>
        `).join('')}
      </ul>
    `
}



