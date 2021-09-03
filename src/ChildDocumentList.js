export default function ChildDocumentList({
  $target,
  initialState,
  childDocClick
}) {
  const $childDoclist = document.createElement('div')
  $target.appendChild($childDoclist)
  this.state = initialState

  this.setState = (nextState)=>{
    this.state = nextState
    this.render()
  }
  this.render = () => {
    $childDoclist.innerHTML = `
      <h3>[${this.state.title}]의 하위 페이지</h3>
      <ul class="child-doc-list">
        ${!this.state.documents.length?`<li>하위 페이지가 없습니다</li>`: this.state.documents.map(doc => `
          <li><a href="">${doc.title}</a></li>
        `).join('')}
      </ul>
    `
  }

  // $childDocList.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   const $li = e.target.closest('li')
  //   console.log('$li :>> ', $li);
  //   childDocClick($li)
  // })
};
