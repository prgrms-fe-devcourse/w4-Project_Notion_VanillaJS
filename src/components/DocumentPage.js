import { request } from "../utils/api.js";
import Header from "./Header.js";
import DocumentList from "./DocumentList.js";
import { getItem, setItem, removeItem } from "../utils/storage.js";


export default function DocumentPage({ $target, onPostClick }) {
  const $page = document.createElement('div')
  $page.setAttribute('class', 'contain-documentPage')
  new Header({
    $target: $page,
    initialState: {
      name: 'jin'
    }
  })

  const tempToggleItem = (id) => `temp-toggle-${id}`
  
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onAddChild: async (id) => {
      const newChild = {
        title: `New Page`,
        parent: id
      }
      const newDocument = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify(newChild)
      })
      setItem(tempToggleItem(id), {state: 'block'})
      this.setState({ ...this.state })
      onPostClick(newDocument.id)
    },
    onDelete: async (id) => {

      if (confirm('지우시겠습니까?')) {
        await request(`/documents/${id}`, {
          method: "DELETE"
        })
        getItem(tempToggleItem(id)) ? removeItem(tempToggleItem(id)) : ''; 
        this.setState({ ...this.state })
      }
    },
    onAddRoot: async () => {
      const newPage = {
        title: "Untitled",
        parent: null
      }
      const newDocument = await request('/documents', {
        method: "POST",
        body: JSON.stringify(newPage)
      })

      this.setState({ ...this.state })
      onPostClick(newDocument.id)
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