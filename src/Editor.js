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
    if (this.state.id !== nextState.id) {
      isInitialize = false
      console.log('아이디가 바뀜')
    }
    this.state = nextState
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
    console.log('editor 생성한다!')
    }
    // $editor.innerHTML = `
    //   <input type='text' class="title" style="width: 300px;" value="${this.state.title}"/><br>
    //   <textarea class="content" style="width: 300px; height: 300px;">${this.state.content === 'null' ? '입력대기중' : this.state.content}</textarea>
    // `
    // console.log('editor 생성한다!')
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