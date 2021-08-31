import { request } from "./api.js"
import Editor from "./Editor.js"
import { getItem, removeItem, setItem } from "./storage.js"
import LinkButton from "./LinkButton.js"


export default function docEditPage({ $target, initialState }) {
  const $page = document.createElement('div')

  this.state = initialState

  let docLocalSaveKey = `temp-doc-${this.state.documentId}`

  const doc = getItem(docLocalSaveKey, {
    title: '',
    content: '',
  })
  
  let timer = null
  
  const editor = new Editor({ 
    $target: $page, 
    initialState: {
      title: '',
      content: ''
    },
    onEditing: (document) => {
      if (timer !== null){
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        setItem(docLocalSaveKey, {
          ...document,
          tempSaveDate: new Date()
        })

        const isNew = this.state.documentId === 'new'
        if(isNew){
          const createdDocument = await request('/posts', {
            method: 'POST',
            body: JSON.stringify(document)
          })
          history.replaceState(null, null, `/posts/${createdDocument.id}`)
          removeItem(docLocalSaveKey)

          this.setState({
            documentId: createdDocument.id,
          })
        } else {
          await request(`/posts/${document.id}`, {
            method: 'PUT',
            body: JSON.stringify(document)
          })

        }

      }, 1500);
    }
  })

  this.setState = async nextState => {
    if (this.state.documentId !== nextState.documentId){ 
      docLocalSaveKey = `temp-doc-${nextState.documentId}`
      this.state = nextState

      if (this.state.documentId === 'new'){
        const doc = getItem(docLocalSaveKey, {
          title: '',
          content: '',
        })
        this.render()
        editor.setState(document)
      } else{
        await fetchDocument()
      }
      return
    }
    
    this.state = nextState
    this.render()

    editor.setState(this.state.document ?? {
      title: '',
      content: ''
    })
  }

  this.render = () => {
    $target.appendChild($page)
  }

  const fetchDocument = async () => {
    const { documentId } = this.state

    if(documentId !== 'new') {
      const document = await request(`/posts/${documentId}`)

      const tempDocument = getItem(docLocalSaveKey, {
        title: '',
        content: '',
      })

      if(tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.updated_at) {
        if(confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            document: tempDocument
          })
          return
        }
      }

      this.setState({
        ...this.state,
        document
      })
    }
  }

  new LinkButton({
    $target: $page,
    initialState: {
      text: '목록으로 이동',
      link: '/'
    }
  })
}
