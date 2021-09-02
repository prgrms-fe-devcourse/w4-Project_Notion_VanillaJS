export default function DocumentPage({$target, initialState, childDocClick}) {
  const $page = document.createElement('div')
  $target.appendChild($page)
  $page.className = 'document-page'

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
    const currentNode = document.querySelector(`.menu-${nextState.id}`)
    if (currentNode) {
      currentNode.classList.add('active')
    }
    console.log('currentNode :>> ', currentNode);
  }

  this.render = () => {
    $page.innerHTML = `
      <div class="doc-page-editor">
        <input type="text" name="title" value ="${this.state.title}"/>
        <textarea name="content">${this.state.content}</textarea>
      </div>
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
    console.log('$li :>> ', $li);
    childDocClick($li)
  })

};
