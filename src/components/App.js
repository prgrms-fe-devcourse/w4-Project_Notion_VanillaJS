import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from '../utils/api.js'
import Editor from './Editor/index.js'
import Sidebar from './Sidebar/index.js'

/*
{
  documents: Array,
  selectedDocumentId: number,
  title: string,
  content: string
}
*/

export default function App({ $target }) {
  this.state = {
    documents: [],
    selectedDocumentId: null,
    title: '',
    content: '',
  }

  this.setState = async (nextState) => {
    if (this.state.selectedDocumentId !== nextState.selectedDocumentId) {
      const selectedDocument = await requestGET(
        `/documents/${nextState.selectedDocumentId}`,
      )

      const { id, title, content } = selectedDocument
      editor.setState({
        title,
        content,
        selectedDocumentId: id,
      })
    }

    this.state = nextState
    const { documents } = this.state

    sidebar.setState(documents)
  }

  const sidebar = new Sidebar({
    $target,
    initialState: this.state.documents,
    onDocumentClick: async (selectedDocumentId) => {
      history.pushState(null, null, `/documents/${selectedDocumentId}`)

      this.setState({
        ...this.state,
        selectedDocumentId,
      })
    },
    onAddDocument: async (document) => {
      history.pushState(null, null, '/documents/new')

      const createdDocument = await requestPOST('/documents', document)

      this.setState({
        ...this.state,
        selectedDocumentId: createdDocument.id,
      })

      history.replaceState(null, null, `/documents/${createdDocument.id}`)

      await fetchDocuments()
    },
    onDeleteDocument: async (id) => {
      await requestDELETE(`/documents/${id}`)

      await fetchDocuments()
    },
  })

  const editor = new Editor({
    $target,
    initialState: {
      selectedDocumentId: this.state.selectedDocumentId,
      title: 'Untitled',
      content: '',
    },
    onEdit: async (id, document) => {
      await requestPUT(`/documents/${id}`, document)
      this.setState({
        ...this.state,
        selectedDocumentId: id,
      })
      await fetchDocuments()
    },
  })

  const fetchDocuments = async () => {
    const documents = await requestGET('/documents')
    this.setState({
      ...this.state,
      documents,
    })
  }

  const init = async () => {
    const { pathname } = location
    const [, , selectedDocumentId] = pathname.split('/')

    if (selectedDocumentId) {
      this.setState({
        ...this.state,
        selectedDocumentId,
      })
    }

    await fetchDocuments()
  }

  init()
}
