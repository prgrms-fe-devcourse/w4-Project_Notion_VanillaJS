export default function Editor({
  $target,
  initialState =  {
    title: '',
    content: ''
  },
  onEditing
}) {
  const $editor = document.createElement('div')
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
    if (!isInitialize){
      $editor.innerHTML = `
      <input type='text' class="title" style="width: 500px;" value="${title}"/><br>
      <textarea class="content" style="width: 500px; height: 600px;" placeholder="내용을 입력하세요.">${content ? content : ''}</textarea>
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