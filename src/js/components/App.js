import PostPage from './SideBar/PostPage.js'
import PostEditPage from './PostMain/PostEditPage.js'

export default function App({ $target }) {
  const $listContainer = document.createElement('div')
  $listContainer.className = 'listContainer'
  const $rendingContainer = document.createElement('div')
  $rendingContainer.className = 'rendingContainer'
  $target.appendChild($listContainer)
  $target.appendChild($rendingContainer)

  const postPage = new PostPage({
    $target: $listContainer,
  })

  const postEditPage = new PostEditPage({
    $target: $rendingContainer,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  })

  this.route = () => {
    const { pathname } = window.location
    console.log(pathname)
    if (pathname === '/') {
      postPage.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      postPage.render()
      postEditPage.setState({ postId })
    }
  }

  this.route()

  // 아이디 넘어오면 해당 URL을 Push State
  window.addEventListener('route-change', (e) => {
    const { nextUrl } = e.detail

    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      this.route()
    }
  })

  // 뒤로 가기.
  window.addEventListener('popstate', () => {
    this.route()
  })
}
