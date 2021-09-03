import { request } from "./api.js";
import Header from "./Header.js";
import DocumentList from "./DocumentList.js";



export default function DocumentPage({ $target, onPostClick, renderNewEditPage }) {
  const $page = document.createElement('div')

  new Header({
    $target: $page,
    initialState: {
      name: 'jin'
    }
  })

  
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onAddChild: async (id) => {
      const bodys = {
        title: `New Page`,
        parent: id,
        content: ''
      }
      const newDocument = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify(bodys)
      })
      this.setState({
        ...this.state
      })
      renderNewEditPage(newDocument.id)
    },
    onDelete: async (id) => {
      if (confirm('지우시겠습니까?')) {
        const selectedDocument = await request(`/documents/${id}`)

        if (selectedDocument.documents.length > 0 ) {
          const { documents, id } = selectedDocument
          
          // 끌어올리기 기능을 구현하려고 했지만, api때문에 불가
          await request(`/documents/${id}`, {
            method: "DELETE"
          }) 
          this.setState({
            ...this.state,
            ...documents
          })
        } else {
          await request(`/documents/${id}`, {
            method: "DELETE"
          }) 
          this.setState({
            ...this.state
          })
        }
        
      }
    },
    onAddRoot: async () => {
      const newPage = {
        title: "Untitled",
        parent: null
      }
      await request('/documents', {
        method: "POST",
        body: JSON.stringify(newPage)
      })
      this.setState({
        ...this.state
      })
    },
    onPostClick
  })

  this.setState = async () => {
    const roots = await request('/documents')
    documentList.setState(roots)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }

  
}