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
  $target.appendChild($editor)
  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    if (!isInitialize){
      $editor.innerHTML = `
      이곳은 메인페이지 입니다.<br>
      바뀌어야 할 필요가 있는 곳이고
      바뀌어야 하는 페이지 입니다.<br>
      <input type='text' name="title" style="width: 300px;" value="${this.state.title}"/><br>
      <textarea name="content" style="width: 300px; height: 300px;">${this.state.content}</textarea>
    `
    isInitialize = true
    }
    
  }

  this.render()
  $editor.addEventListener('keyup', (e) => {
    const { target } = e
    const name = target.getAttribute('name')
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