import RootPage from "./RootPage.js"
import PostEditPage from "./PostEditPage.js"
import { setItem, getItem } from "./storage.js"


export default function App({ $target }) {

  const $rootListContainer = document.createElement('div')
  const $mainListContainer = document.createElement('div')

  $target.appendChild($rootListContainer)
  $target.appendChild($mainListContainer)

  const rootPage = new RootPage({
    $target: $rootListContainer,
    onPostClick: (id) => {
      history.pushState(null, null, `/documents/${id}`)
      this.route()
    }
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
      console.log(pathname)
      if (pathname === '/') {
        rootPage.setState()
      } else if (pathname.indexOf('/documents/') === 0) {
        $mainListContainer.innerHTML = `새 페이지에서 보기도 추가하면 좋겠다. <br><br>`
        const[,, id] = pathname.split('/')
        console.log(id)
        rootPage.setState()
        postEditPage.setState({ id })
      }
    }

    this.route()
  
}
