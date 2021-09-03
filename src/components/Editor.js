export default function Editor({
  $target,
  initialState =  {
    title: '',
    content: ''
  },
  onEditing
}) {
  const $editor = document.createElement('div')
  // const $topTitle = document.createElement('div')
  // $topTitle.setAttribute('class', 'topTitle')
  // $target.append($topTitle)
  let isInitialize = false
  
  this.state = initialState
  $target.appendChild($editor)
  this.setState = nextState => {
    if (nextState) {
      if (this.state.id !== nextState.id) {
        isInitialize = false
      }
      this.state = nextState
      $editor.getElementsByClassName('title').value = this.state.title
      $editor.getElementsByClassName('content').value = this.state.content
      this.render()
    }
    
  }
  
  this.render = () => {
    const { title, content } = this.state
    // $topTitle.innerHTML = `${(title === 'Untitled') ? '' : (title)}`
    if (!isInitialize){
      // Untitle이거나, New Page이면 placeholder/ 이외에 value
      const defaultTitle = (title) => (title === 'Untitled' || title === 'New Page')? `placeholder="${title ? title : 'Untitled'}"`: `value="${title}"`
    
      $editor.innerHTML = `
      <input type='text' class="title" ${defaultTitle(title)} autofocus /><br>
      <textarea class="content" placeholder="내용을 입력하세요.">${content ? content : ''}</textarea>
      `
    isInitialize = true
    }
  }

  
  $editor.addEventListener('keyup', (e) => {
    const { target } = e
    
    const name = target.getAttribute('class')
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value
      }
      this.setState(nextState)
      onEditing(this.state)
    }
  })
}