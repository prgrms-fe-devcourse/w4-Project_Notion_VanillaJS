import DocumentPage from "./components/DocumentPage.js"
import PostEditPage from "./components/PostEditPage.js"

export default function App({ $target }) {

  const $documentListContainer = document.createElement('div')
  const $editContainer = document.createElement('div')

  $documentListContainer.setAttribute('class', 'main-documentPage')
  $editContainer.setAttribute('class', 'main-editPage')

  $target.appendChild($documentListContainer)
  $target.appendChild($editContainer)

  const documentPage = new DocumentPage({
    $target: $documentListContainer,
    onPostClick: (id) => {
      history.pushState(null, null, `/documents/${id}`)
      this.route()
    }
  })

  const postEditPage = new PostEditPage({
    $target: $editContainer,
    initialState: {
      id: '',
      post: {
        title: '',
        content: ''
      }
    },
    refresh: () => documentPage.setState()
    })
    
  this.route = () => {
    const { pathname } = window.location
    if (pathname === '/') {
      $editContainer.innerHTML = ``
      documentPage.setState()
    } else if (pathname.indexOf('/documents/') === 0) {
      const[ , , id ] = pathname.split('/')
      documentPage.setState()
      location.setState({id})
      postEditPage.setState({ id })
    }
  }

  this.route()

  window.addEventListener('popstate', () => {
    this.route()
  })
  
}
