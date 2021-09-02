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
      <ul class="child-doc-list">
        ${this.state.documents? this.state.documents.map(doc => `
          <li><a href="">${doc.title}</a></li>
        `).join('') : ''}
      </ul>
    `
  }
  this.render()

  // $childDocList.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   const $li = e.target.closest('li')
  //   console.log('$li :>> ', $li);
  //   childDocClick($li)
  // })
};
