import DocumentList from "./DocumentList.js";
import Editor from "./Editor.js";
import { request, USERNAME } from "./api.js"
import { initRouter, push } from "./router.js";

export default function App ({ $target }) {
  const documentList = new DocumentList({ 
    $target,
    initialState: [],
    onDocsClick: (id, {className}) => {
      history.pushState('','',`/documents/${id}`)
      this.route()

      if (className === 'removeBtn') {
        if(confirm("삭제하실건가요?")) {
          removeDocument(id)
        }
      }
    }
   })

  const editor = new Editor({ 
  $target,
  initialState: {
    title: `${USERNAME} 님 반가워요 😃`,
    content: '',
    createdAt: '',
    updatedAt: ''
   },
   documentEditing: (title, content, id) => {
    newDocument(title, id)
   }
  })

  // 문서 목록 업데이트
  const fetchDocumentList = async () => {
    const docList = await request(`/documents`)
    documentList.setState(docList)
  }
  fetchDocumentList()
  // 문서 조회
  const fetchDocument = async (id) => {
    const document = await request(`/documents/${id}`,{
      method: 'GET',
    })
    editor.setState(document)
  }

  // 문서 삭제
  const removeDocument = async (id) => {
    const document = await request(`/documents/${id}`,{
      method: 'DELETE',
    })
    fetchDocumentList()
  }

  // 문서 생성
  const newDocument = async (title, id) => {
    const document = await request(`/documents`,{
      method: 'POST',
      body: JSON.stringify({
        'title': title,
        'parent': Number(id),
      })
    })
    fetchDocumentList()
    push(`/documents/${document.id}`);
  }

  this.route = () => {
    const { pathname } = window.location

    if (pathname === '/') {
      editor.setState({
        title: `${USERNAME} 님 반가워요 😃`,
        content: '',
        createdAt: '',
        updatedAt: ''
       })
    } else if (pathname.indexOf('/documents/') === 0 ) {
      const [, , documentId] = pathname.split('/')
      fetchDocument(documentId)
    }
  }

  this.route()

  initRouter(() => this.route())
}
