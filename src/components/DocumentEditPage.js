import Editor from "./Editor.js";
import { setItem, getItem, removeItem } from "../utils/storage.js";
import { request } from "../api/api.js";
import { initRoute } from "../utils/router.js";


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
    $target : $editPage,
    initialState: tempDocument || {
        title: "",
      content: "",
    },
    onEditing: (document) => {
        // console.log(tempDocument)
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async() => {
        console.log(document)
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveData: new Date(),
        });

        const isNew = this.state.documentId === 'new'
        if(isNew){
            const createdDocument =  await request('/', {
                method : 'POST',
                body: JSON.stringify({
                    title : document.title,
                    parent: null
                })
            })
            history.replaceState(null, null, `/${createdDocument.id}`)
            await request(`/${createdDocument.id}`, {
                method : 'PUT',
                body : JSON.stringify(document)
            })
            
            removeItem(documentLocalSaveKey)

        }else{
            await request(`/${this.state.documentId}`, {   //오류뜰 때 원래는 post.id라고 썼었는데 post라고 쓴게 로컬데이터랑 타이핑 밖에 없었음!
                method : 'PUT',
                body : JSON.stringify(document)
            })
            removeItem(documentLocalSaveKey)
        }

     
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
  this.route = () => {
    const {pathname} = window.location
    const [, id] = pathname.split('/')
    this.setState({
        documentId : id
    })
    editor.render()
  }
  
  initRoute(() => this.route())


}
