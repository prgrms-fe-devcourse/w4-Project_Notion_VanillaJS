export default function Editor ({ $target, initialState }) {
    const $editor = document.createElement('div')
    const $title = document.createElement('input')
    const $content = document.createElement('textarea')
    $editor.className = 'editor'
    $title.className = 'title'
    $content.className = 'content'
  
    $target.appendChild($editor)
    $editor.appendChild($title)
    $editor.appendChild($content)
  
    $title.setAttribute('placeholder', 'Untitled');
  
    this.state = initialState

    this.setState = (nextState) => {
      this.state = nextState;
      this.render()
    }
  
    this.render = () => {
  
  
    }
  
    this.render()
  }
