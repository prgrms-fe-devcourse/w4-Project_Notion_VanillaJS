import { request } from "./api.js"
import Editor from "./Editor.js"
import { getItem, setItem } from "./storage.js"


export default function docEditPage({ $target, initialState }) {
  const $page = document.createElement('div')

  this.state = initialState


  const TEMP_DOC_SAVE_KEY = 'temp-documnet-${this.state.documentId}'

  const doc = getItem(TEMP_DOC_SAVE_KEY, {
    title: '',
    content: '',
  })
  
  let timer = null
  
  const editor = new Editor({ 
    $target: $page, 
    initialState: doc, 
    onEditing: (document) => {
      if (timer !== null){
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setItem(TEMP_DOC_SAVE_KEY, {
          ...document,
          tempSaveDate: new Date()
        })
      }, 1500);
    }
  })

  this.setState = async nextState => {
    if (this.state.documentId !== nextState.documentId){    
      this.state = nextState
      await fetchDocument()
      return
    }
    
    this.state = nextState
    this.render()

    editor.setState(this.state.document)
  }

  this.render = () => {
    $target.appendChild($page)
  }

  const fetchDocument = async () => {
    const { documentId } = this.state

    if(documentId !== 'new') {
      const document = await request(`/documents/${documentId} - POST`)

      this.setState({
        ...this.state,
        post
      })
    }
  }
}
