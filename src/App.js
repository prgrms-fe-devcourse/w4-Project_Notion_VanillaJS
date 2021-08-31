import NavigationBar from './NavigationBar.js'
import EditPage from './EditPage.js'

export default function App ({ $target }) {

  new NavigationBar({
    $target
  })

  const editPage = new EditPage({
    $target,
  })


  this.route = () => {
    const { pathname } = window.location
    
    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/')
      console.log(`editPage.setState({ ${documentId} })`)
      editPage.setState({ documentId })
    }
  }

  this.route()

  const initRouter = (onRoute) => {
    window.addEventListener('route-change', (event) => {
      const { nextUrl } = event.detail
  
      if (nextUrl) {
        history.pushState(null, null, nextUrl)
        onRoute()
      }
    })
  }

  initRouter(() => this.route())
}