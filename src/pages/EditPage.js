import Editor from '../components/Editor.js';
import EditorBottomBar from '../components/EditorBottomBar.js'
import { request } from '../utils/api.js';
import { StorageUtils } from '../utils/storage.js';
import { EventUtils } from '../utils/event.js'

export default function EditPage({ $target, initialState }) {
  const $editPage = document.createElement('div')
  
  this.state = initialState
  
  let KeyLocalDocument = `temp-document-${this.state.documentId}`

  const localSavedDocument = StorageUtils.getItem(KeyLocalDocument, {
    title: '',
    content: ''
  })
  
  let timer = null
  
  const editor = new Editor({
    $target: $editPage,
    initialState: localSavedDocument,

    onEditing: async (document) => {
      // Debounce : 1초
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => { 
        // !!! 리스트 업데이트 해주기
        
        // 로컬 KEY ID 업데이트
        let KeyLocalDocument = `temp-document-${this.state.documentId}`;
        
        // 로컬에 저장
        StorageUtils.setItem(KeyLocalDocument, {
          ...document,
          tempSaveDate: new Date(),
        });
  
        // Put: 수정 데이터 send
        const putDocument = await request(`/documents/${document.id}`, {
          method: "PUT",
          body: JSON.stringify(document),
        });
  
        // 로컬에서 삭제
        StorageUtils.removeItem(KeyLocalDocument)
        //console.log("putDocument", putDocument);

        // cutomEvent dispatcher
        EventUtils.titleDispatcher()

      }, 200);
      
    },

    //await request(`/documents/${document.id}`)
  });
  

  const editorBottomBar = new EditorBottomBar({
    $target: $editPage
  })
  

  this.setState = async (nextState) => {
    /*
    if (this.state.documentId === 'new') {
      const localSavedDocument = getItem(KeyLocalDocument, {
        title: '',
        content: ''
      })
      editor.setState()
    }*/

    this.state = nextState
    // console.log('editpage', this.state)
    fetchDocument()
  }


  const fetchDocument = async () => {
    
    //console.log(this.state.documentId)

    const { documentId } = this.state
    if (documentId !== 'new') {

      const document = await request(`/documents/${documentId}`)
      console.log('document:',document)
      editor.setState(document)
      // 현재 document 하위 document 수 만큼 버튼 렌더
      editorBottomBar.makeSubButtons(document)

      this.render()
    }
  }
  
  
  this.render = () => {
    $target.appendChild($editPage)
  }
  
}