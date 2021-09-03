import Editor from './Editor/index.js'
import Header from '/src/components/Header/index.js'
import TreeMenu from '/src/components/TreeMenu/index.js'
import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from '/src/utils/api.js'

export default function App({ $target }) {
  this.state = {
    documents: [],
    selectedDocumentId: null,
  }

  const $sidebar = document.createElement('div')
  $sidebar.className = 'Sidebar'

  $target.appendChild($sidebar)

  new Header({
    $target: $sidebar,
  })

  const treeMenu = new TreeMenu({
    $target: $sidebar,
    initialState: this.state,
    onDocumentClick: (selectedDocumentId) => {
      history.pushState(null, null, `/documents/${selectedDocumentId}`)

      this.setState({
        ...this.state,
        selectedDocumentId,
      })
    },
    onAddDocument: async (document) => {
      history.pushState(null, null, '/documents/new')

      const createdDocument = await requestPOST('/documents', document)

      const { id } = createdDocument

      this.setState({
        ...this.state,
        selectedDocumentId: id,
      })

      history.replaceState(null, null, `/documents/${id}`)

      await fetchDocuments()
    },
    onDeleteDocument: async (id) => {
      await requestDELETE(`/documents/${id}`)
      await fetchDocuments()
    },
  })

  const $editorScrollArea = document.createElement('div')
  $editorScrollArea.className = 'EditorContainer'

  $target.appendChild($editorScrollArea)

  const editor = new Editor({
    $target: $editorScrollArea,
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

  function addDepth(arr, depth = 0) {
    arr.forEach((document) => {
      document.depth = depth
      addDepth(document.documents, depth + 1)
    })
  }

  this.setState = (nextState) => {
    if (this.state.selectedDocumentId !== nextState.selectedDocumentId) {
      editor.setState({
        selectedDocumentId: nextState.selectedDocumentId,
      })
    }

    const { documents } = nextState
    addDepth(documents)
    this.state = nextState
    treeMenu.setState({ ...this.state })
  }

  const fetchDocuments = async () => {
    const documents = await requestGET('/documents')

    this.setState({
      ...this.state,
      documents,
    })
  }

  this.route = () => {
    const { pathname } = location
    const [, , selectedDocumentId] = pathname.split('/')

    if (selectedDocumentId) {
      this.setState({
        ...this.state,
        selectedDocumentId,
      })
    }
  }

  const init = async () => {
    window.addEventListener('popstate', () => {
      this.route()
    })

    this.route()
    await fetchDocuments()
  }

  init()
}
