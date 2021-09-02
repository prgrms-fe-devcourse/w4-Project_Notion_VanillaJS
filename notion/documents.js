export default function Documents ({ 
  $target, 
  initialState, 
  onFold, 
  onCreate, 
  onEdit 
}) {
  const list = document.createElement('div')
  list.className = 'documents-list'
  $target.appendChild(list);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    list.innerHTML = `
    <h3>📝 Documents</h3>
    <ul>
      ${this.state.map((li) => `
      <li data-id="${li.id}">
      <button class="under">▶</button>
      ${li.title}
      <button class="create">+</button>
      </li>`
      ).join('')}
    </ul>`
  }

  this.render()

  // add click event
  list.addEventListener('click', (e) => {
    const $list = e.target.closest('li')
    const $button = e.target.closest('button')

    // code for protecting
    if ($button) {
      if ($button.className === 'under') { 
        onFold($list)
      } else if ($button.className === 'create') {
        onCreate($list)
      } 
    } else {
      onEdit($list)
    }
  })
}