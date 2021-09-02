export default function SubDocsPage({
                                      $target,
                                      initialState,
                                      onClickLi
                                    }) {
  this.state = initialState

  /*
  * initialState:{
  *   docList:[]
  * }
  * */
  const $subDocList = document.createElement('div')
  $subDocList.setAttribute('id', 'sub-docs-page')
  $target.appendChild($subDocList)


  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  this.render = () => {
    const {docList} = this.state
    $subDocList.innerHTML = `
      <h3 id="sub-docs-title">하위 페이지 목록</h3>
      <ul id="sub-docs-ul">
        ${docList.map(doc => `<li class="sub-doc-li" id="sub-doc-${doc.id}">${doc.title}</li>`)}
      </ul>
    `
  }
  this.render()

  $subDocList.addEventListener('click', e => {
    const $subDocLi = e.target.closest('.sub-doc-li')
    console.log($subDocLi)
    const id = $subDocLi.id.substr(8)
    onClickLi(id)
  })

  this.render()
}