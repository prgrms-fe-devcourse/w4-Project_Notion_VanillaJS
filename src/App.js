import MainPage from './pages/MainPage.js'
import NotFoundPage from './pages/NotFoundPage.js'
import {
  requestDELETE,
  requestGET,
  requestPOST,
  requestPUT,
} from './utils/api.js'

export default function App({ $target }) {
  const notFoundPage = new NotFoundPage({
    $target,
  })

  const mainPage = new MainPage({
    $target,
  })

  this.state = {
    user: 'grighth12',
    documents: null,
    document: null,
    isPOSTLoading: false,
  }

  this.setState = (nextState) => {
    this.state = nextState
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
    if (pathname.indexOf('/documents/') === 0) {
      document = await requestGET(`/documents/${documentId}`)
    }

    this.setState = {
      ...this.state,
      documents,
      document,
    }

    this.route()
  }

  this.init()
}
