export default function ChildDocumentList({
  $target,
  initialState,
  childDocClick
}) {
  const $childDocList = document.createElement('div')
  $target.appendChild($childDocList)
  this.state = initialState

  this.setState = (nextState)=>{
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $childDocList.innerHTML = `
      <h3>[${this.state.title}] 의 하위 페이지</h3>
      <ul class="child-doc-list">
        ${!this.state.documents.length?`<li>하위 페이지가 없습니다</li>`: this.state.documents.map(doc => `
          <li data-id='${doc.id}'><a href="">${doc.title}</a></li>
        `).join('')}
      </ul>
    `
  }


  const linkToPage = document.querySelector('.child-doc-list')
  console.log('linkToPage :>> ', linkToPage);
  $childDocList.addEventListener('click', (e) => {
    e.preventDefault()
    const $li = e.target.closest('li')
    const {id} = $li.dataset
    if (id) {
      childDocClick(id)
    }
  })

};
