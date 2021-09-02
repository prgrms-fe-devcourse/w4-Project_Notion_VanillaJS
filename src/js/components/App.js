import PostPage from './SideBar/PostPage.js'
import PostEditPage from './PostMain/PostEditPage.js'
import { initRouter, popUrl } from './Router.js'

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
      postPage.setState()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditPage.setState({ postId })
      postPage.setState()
    }
  }

  this.route()

  // 아이디 넘어오면 해당 URL을 Push State
  initRouter(() => this.route())

  // 뒤로 가기.
  popUrl(() => this.route())
}
