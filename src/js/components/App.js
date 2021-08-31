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

    if (pathname === '/') {
      postPage.render()
      // documents/id가 있다는 케이스
    } else if (pathname.indexOf('/documents/') === 0) {
      // id만 추출
      const [, , postId] = pathname.split('/')
      postPage.render()
      console.log(postId)
      // postEdit
      postEditPage.setState({ postId })
    }
  }

  // 아아아아아앍!
  this.route()

  window.addEventListener('route-change', (e) => {
    const { nextUrl } = e.detail
    console.log(nextUrl)
    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      this.route()
    }
  })
}
