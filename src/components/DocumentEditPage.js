import Editor from "./Editor.js";
import { setItem, getItem } from "../utils/storage.js";
import { request } from "../api/api.js";

export default function DocumentEditPage({ $target, initialState }) {
  const $editPage = document.createElement('div')
  $editPage.className = 'edit-page'
  this.state = initialState
    
  
  let TEMP_DOCUMENT_SAVE_KEY = `temp-document-${this.state.documentId}`;

  const tempDocument = getItem(TEMP_DOCUMENT_SAVE_KEY, {
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
        setItem(TEMP_DOCUMENT_SAVE_KEY, {
          ...document,
          tempSaveData: new Date(),
        });
      }, 1000);
    },
  });

  
  this.setState = async nextState => {
      if(this.state.documentId !== nextState.documentId){
        this.state = nextState
        
        await fetchDocument()
        return 
      }

    this.state = nextState
    editor.setState(this.state.document)
    this.render()
    }

  this.render = () => {
      $target.appendChild($editPage)
  }

  const fetchDocument =async() => {
      const {documentId} = this.state

      if(this.state.documentId !== 'new'){
      const document = await request(`/${documentId}`)
          this.setState({
              ...this.state,
            document
          })
          console.log(this.state)
        }
  }
}
