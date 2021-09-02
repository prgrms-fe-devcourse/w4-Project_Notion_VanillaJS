export default function DocumentPage({$target, initialState, childDocClick}) {
  const $page = document.createElement('div')
  $target.appendChild($page)

  this.state = initialState

  this.setState = nextState => {
    console.log('nextState :>> ', nextState);
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $page.innerHTML = `
      <div>${this.state.title}</div>
      <div>${this.state.content}</div>
      <ul class="child-doc-list">
        ${this.state.documents? this.state.documents.map(doc => `
          <li><a href="">${doc.title}</a></li>
        `).join('') : ''}
      </ul>
    `
  }
  this.render()

  const $childDocList = document.querySelector('.child-doc-list')
  $childDocList.addEventListener('click', (e) => {
    e.preventDefault()
    const $li = e.target.closest('li')
    childDocClick($li)
  })

};
