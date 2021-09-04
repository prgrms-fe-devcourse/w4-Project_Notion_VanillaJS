import NavigationBar from './NavigationBar.js'
import EditPage from './pages/EditPage.js'
import HomePage from './pages/HomePage.js'
import { RouterUtils } from './utils/router.js'
import { request } from './utils/api.js'

export default function App ({ $target }) {
  const $page = document.querySelector('.page')
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
  
  const navigationBar = new NavigationBar({

    onDeleteDoc : async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE'
      })

      // 현재 edit중인 문서 삭제 시 메인으로 가기
      let { pathname } = window.location
      let [, , _documentId] = pathname.split('/')
      if (id === _documentId) {
        // onDelete시 isReplace : true 값을 추가하여 뒤로가기 시 오류방지
        RouterUtils.routerDispatcher('/', true)
        //history.back()
      }

      pathname = window.location.pathname
      _documentId =  pathname.split('/')[2]
      // 삭제 시 관련페이지 재렌더링
      navigationBar.setState()
      console.log('_documentId :',_documentId)
      editPage.setState({ documentId: _documentId })
    }
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
  
  RouterUtils.initRouter(() => this.route())
  $target.appendChild($page)
  
}