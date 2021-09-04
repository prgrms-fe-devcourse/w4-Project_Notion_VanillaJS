import Editor from '../components/Editor.js';
import EditorBottomBar from '../components/EditorBottomBar.js'
import { request } from '../utils/api.js';
import { StorageUtils } from '../utils/storage.js';
import { EventUtils } from '../utils/event.js'
import { RouterUtils } from '../utils/router.js';

export default function EditPage({ $target, initialState }) {
  const $editPage = document.createElement('div')
  $editPage.classList.add('edit-page')
  
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
        console.log(putDocument)
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

  const fetchDocument = async () => {

    const { documentId } = this.state
    if (!!documentId) {
      //console.log(documentId)
      const document = await request(`/documents/${documentId}`).catch(() => RouterUtils.routerDispatcher('/'))
      editor.setState(document)
      editor.render()
      // 현재 document 하위 document 수 만큼 버튼 렌더
      editorBottomBar.makeSubButtons(document)
      
      this.render()
    }
  }

  this.setState = async (nextState) => {
    this.state = nextState
    // console.log('editpage', this.state)
    fetchDocument()
  }


  
  
  this.render = () => {
    $target.appendChild($editPage)
  }
  
}