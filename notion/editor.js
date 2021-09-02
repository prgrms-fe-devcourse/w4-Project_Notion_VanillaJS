export default function Editor ({ $target, initialState }) {
  const editor = document.createElement('div')
  const title = document.createElement('input')
  const contentbox = document.createElement('div')

  title.className = 'title'
  editor.className = 'editor'
  contentbox.className = 'contentbox'

  $target.appendChild(editor)
  editor.appendChild(title)
  editor.appendChild(contentbox)

  title.setAttribute('placeholder', 'Untitled');
  contentbox.setAttribute('contenteditable', 'true');
  contentbox.setAttribute('placeholder', 'What should I write in here?');

  this.state = initialState
  this.setState = (nextState) => {
    this.state = nextState;
    this.render()
  }

  this.render = () => {


  }

  window.addEventListener('keyup', (e) => {
  })

  this.render()
}