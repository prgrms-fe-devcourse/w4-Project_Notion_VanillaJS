export default function Documents ({ $target, initialState}) {
    const $documentsList = document.createElement('div')
    $documentsList.className = 'documentsList'
    $target.appendChild($documentsList);
  
    this.state = initialState;

    this.setState = (nextState) => {
      this.state = nextState
      this.render()
    }
  
    this.render = () => {
      $documentsList.innerHTML = `
      <h4>PRIVATE</h4>
      <ul>
        ${this.state.map((list) => `
        <li data-id="${list.id}">
        <button class="toggleList">▼</button>
        ${list.title}
        <button class="create">+</button>
        </li>`
        ).join('')}
      </ul>`
    }
  
    this.render()
  
    $documentsList.addEventListener('click', (e) => {
      const $list = e.target.closest('li')
      const $button = e.target.closest('button')
    })
  }
