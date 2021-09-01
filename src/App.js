import NavigationBar from './NavigationBar.js'
import EditPage from './pages/EditPage.js'
import HomePage from './pages/HomePage.js'
import { RouterUtils } from './utils/router.js'

export default function App ({ $target }) {
  const $page = document.createElement('div')

  new NavigationBar({
    $target
  })

  const editPage = new EditPage({
    $target: $page,
    initialState: {
      documentId: '',
      title: '',
      content: ''
    }
  })

  const homePage = new HomePage({
    $target: $page
  })

  
  this.route = () => {
    const { pathname } = window.location
    $page.innerHTML = ''
    
    if (pathname === '/') {
      homePage.render()
      
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/')
      editPage.setState({ documentId })
      
      console.log(`editPage.setState({ ${documentId} })`)
    }
  }

  this.route()
  
  $target.appendChild($page)

  RouterUtils.initRouter(() => this.route())
}