import RootPage from "./RootPage.js"
import PostEditPage from "./PostEditPage.js"
import Location from "./Location.js"
import { setItem, getItem } from "./storage.js"


export default function App({ $target }) {

  const $rootListContainer = document.createElement('div')
  const $mainListContainer = document.createElement('div')

  $rootListContainer.setAttribute('class', 'main-documentPage')
  $mainListContainer.setAttribute('class', 'main-editPage')

  $target.appendChild($rootListContainer)
  $target.appendChild($mainListContainer)

  const rootPage = new RootPage({
    $target: $rootListContainer,
    onPostClick: (id) => {
      history.pushState(null, null, `/documents/${id}`)
      this.route()
    },
    renderNewEditPage: (id) => {
      postEditPage.setState({ id })
    }
  })
  new Location({
    
  })
  const postEditPage = new PostEditPage({
    $target: $mainListContainer,
    initialState : {
      id: '',
      post: {
        title: '',
        content: ''
      }
    },
    refreshing: () => {
      rootPage.setState()
    }
    })
    


  this.route = () => {
    const { pathname } = window.location
    if (pathname === '/') {
      $mainListContainer.innerHTML = ``
      rootPage.setState()
    } else if (pathname.indexOf('/documents/') === 0) {
      const[ , , id ] = pathname.split('/')
      rootPage.setState()
      postEditPage.setState({ id })
    }
  }

  this.route()

  window.addEventListener('popstate', () => {
    this.route()
  })
  
}
