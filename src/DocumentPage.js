import Editor from './Editor.js';
import ChildDocumentList from './ChildDocumentList.js';
import {request} from './api.js';

export default function DocumentPage({$target, initialState, childDocClick, titleUpdate}) {
  const $page = document.createElement('div')
  $target.appendChild($page)
  $page.className = 'document-page'

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
    console.log('nextState :>> ', nextState);
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

  let timer = null

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: '',
      content: ''
    },
    onEditing: (editDoc) => {
      const {title, content} = editDoc
      titleUpdate(title)
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(async() => {
        await request(`/documents/${this.state.id}`, {
          method:'PUT',
          body: JSON.stringify(
            {
              "title" : title,
              "content" : content
            }
          )
        })
      }, 1000)
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
