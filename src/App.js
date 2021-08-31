import RootPage from "./RootPage.js"
import PostEditPage from "./PostEditPage.js"
import { setItem, getItem } from "./storage.js"


export default function App({
  $target
}) {

  const $rootListContainer = document.createElement('div')
  const $mainListContainer = document.createElement('div')

  $target.appendChild($rootListContainer)
  $target.appendChild($mainListContainer)

  const rootPage = new RootPage({
    $target: $rootListContainer
  })

  new PostEditPage({
    $target: $mainListContainer,
    initialState: {
      title: '',
      content: ''
    }
    })

    this.route = () => {
      
      const { pathname } = window.location
      console.log(pathname)
      if (pathname === '/') {
        rootPage.setState()
      } 
      
    }
    this.route()
  
}
