import DocumentEditor from './components/DocumentEditor.js';
import { request } from './api.js';
import { setItem, getItem, removeItem } from './storage.js';

export default function EditPage({ $target, initialState }) {
  
  this.state = initialState
  
  const KeyLocalDocument = `temp-document-${this.state.documentId}`

  
  
  
  const localSavedDocument = getItem(KeyLocalDocument, {
    title: '',
    content: ''
  })
  
  
  let timer = null
  
  const documentEditor = new DocumentEditor({
    $target,
    initialState: localSavedDocument,
    
    onEditing : (document) => {
        
        /*if (isNew) {
          const createdDocument = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
              "title": "문서 제목",
              "parent": null
            })
          })
          history.replaceState(null, null, `/documents/${createdDocument.id}`)
          removeItem(KeyLocalDocument)
          this.setState({
            documentId: createdDocument.id
          })
          */
          
  
          // !!! 리스트 업데이트 해주기
  
         /*
          console.log(localSavedDocument.id)
          await request(`/documents/${localSavedDocument.id}`, {
            method: 'PUT',
            body: JSON.stringify(localSavedDocument)
          })
          */
        
        
        }

      //await request(`/documents/${document.id}`)
    
  })
  
  this.setState = async (nextState) => {
    if (this.state.documentId === 'new') {
      const localSavedDocument = getItem(KeyLocalDocument, {
        title: '',
        content: ''
      })
      documentEditor.setState()
    }

    this.state = nextState
    fetchDocument()
  }


  const fetchDocument = async () => {
    console.log(this.state) // {documentId: "new"}
    console.log(this.state.documentId)

    const { documentId } = this.state
    if (documentId !== 'new') {

      const documents = await request(`/documents/${documentId}`)
      
      documentEditor.setState(documents)
      console.log('documents:',documents)
    }
    
  }
  
  
}