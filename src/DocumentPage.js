import Editor from './Editor.js';
import ChildDocumentList from './ChildDocumentList.js';

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

    editor.setState({
      title: this.state.title,
      content: this.state.content
    })
    childDocumentList.setState(nextState)
  }

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: ''
    }
  })

  const childDocumentList = new ChildDocumentList({
    $target: $page,
    initialState: {},
    childDocClick
  })

  this.render = () => {
    
  }
  this.render()

  

};
