import MainPage from './pages/MainPage.js'
import NotFoundPage from './pages/NotFoundPage.js'
import RouterUtils from './utils/router.js'
import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from './utils/api.js'

export default function App({ $target }) {
  this.state = {
    username: 'grighth12',
    documents: null,
    document: null,
    isSaveLoading: false,
  }

  const onDocumentClick = async (id) => {
    const document = await requestGET(`/documents/${id}`)

    this.setState({
      ...this.state,
      document,
    })

    RouterUtils.push(`/documents/${id}`)
  }

  const onDocumentDelete = async (id) => {
    await requestDELETE(`/documents/${id}`)

    const documents = await requestGET('/documents')

    this.setState({
      ...this.state,
      documents,
    })

    const { prevUrl } = history.state
    if (`/documents/${id}` === location.pathname) {
      RouterUtils.replace(prevUrl)
    }
  }

  const onDocumentAdd = async (parent) => {
    const { id } = await requestPOST('/documents', {
      title: '',
      parent,
    })

    const document = await requestGET(`/documents/${id}`)
    const documents = await requestGET('/documents')

    this.setState({
      ...this.state,
      document,
      documents,
    })

    RouterUtils.push(`/documents/${id}`)
  }

  const onDocumentEdit = async (id, documentData) => {
    this.setState({
      ...this.state,
      isSaveLoading: true,
    })
    await requestPUT(`/documents/${id}`, documentData)

    const document = await requestGET(`/documents/${id}`)
    const documents = await requestGET('/documents')

    this.setState({
      ...this.state,
      isSaveLoading: false,
      document,
      documents,
    })
  }

  const notFoundPage = new NotFoundPage({
    $target,
  })

  const mainPage = new MainPage({
    $target,
    initialState: this.state,
    onDocumentClick,
    onDocumentAdd,
    onDocumentDelete,
    onDocumentEdit,
  })

  this.setState = (nextState) => {
    this.state = nextState
    mainPage.setState(this.state)
  }

  this.route = () => {
    const { pathname } = location
    $target.innerHTML = ''

    if (pathname === '/' || pathname.indexOf('/documents/') === 0) {
      mainPage.render()
    } else {
      notFoundPage.render()
    }
  }

  this.init = async () => {
    const documents = await requestGET('/documents')

    const { pathname } = location
    const [, , documentId] = pathname.split('/')
    let document = null
    if (typeof Number(documentId) === 'number') {
      document = await requestGET(`/documents/${documentId}`)
    }

    this.setState({
      ...this.state,
      documents,
      document,
    })

    this.route()
  }

  this.init()
  RouterUtils.initRoute(this.init)
}
