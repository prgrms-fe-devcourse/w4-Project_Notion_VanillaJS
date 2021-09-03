import Editor from "./Editor.js";
import { setItem, getItem } from "../utils/storage.js";
import { request } from "../api/api.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $editPage = document.createElement('div')
  $editPage.className = 'edit-page'
  this.state = initialState
    
  
  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const tempDocument = getItem(documentLocalSaveKey, {
    title: '',
    content: "",
  });
  


  let timer = null;

  const editor = new Editor({
    $target,
    initialState: tempDocument || {
        title: "",
      content: "",
    },
    onEditing: (document) => {
        // console.log(tempDocument)
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        console.log(document)
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveData: new Date(),
        });

     
      }, 1000);
    },
  });

  
  this.setState = async nextState => {
      if(this.state.documentId !== nextState.documentId){
    documentLocalSaveKey = `temp-document-${this.state.documentId}`;

        this.state = nextState
        
        await fetchDocument()
        return 
      }
     
    this.state = nextState
    this.render()
    editor.setState(this.state.document || {
        title : '',
        content : ''
    })

    }

  this.render = () => {
      $target.appendChild($editPage)
  }

  const fetchDocument =async() => {
      const {documentId} = this.state

      if(this.state.documentId !== 'new'){
      const document = await request(`/${documentId}`)

    //   console.log(documentLocalSaveKey)
      const getTempDocument = getItem(documentLocalSaveKey, {
        title: '',
        content: "",
      });
      if(getTempDocument.tempSaveData && getTempDocument.tempSaveData > document.updatedAt){
          if(confirm('저장하지 않은 임시데이터가 있습니다. 불러올까요?')){
              this.setState({
                  ...this.state,
                  document: getTempDocument
              })
              return 
          }
      }

          this.setState({
              ...this.state,
            document
          })
          console.log(this.state)
        }
  }
}
