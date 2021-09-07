import DocumentList from "./DocumentList.js";
import Editor from "./Editor.js";
import { docsTreeToArray } from "./tool.js";
import { request, USERNAME } from "./api.js"

export default function App ({ $target }) {
  const documentList = new DocumentList({ 
    $target,
    initialState: [],
    onDocsClick: (id, {className}, state) => {
      fetchDocument(id)

      if(className === 'removeBtn'){
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
  }
}
