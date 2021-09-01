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
    this.state = nextState
    console.log(this.state)
    $editor.getElementsByClassName('title').value = this.state.title
    $editor.getElementsByClassName('content').value = this.state.content
    this.render()
  }
  
  this.render = () => {
    if (!isInitialize){
      $editor.innerHTML = `
      <input type='text' class="title" style="width: 300px;" value="${this.state.title}"/><br>
      <textarea class="content" style="width: 300px; height: 300px;">${this.state.content}</textarea>
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