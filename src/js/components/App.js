import PostPage from './SideBar/PostPage.js'
import PostEditPage from './PostMain/PostEditPage.js'

/*
  url 규칙

  루트 : postPage 그리기
  /posts/{id} - id에 해당하는 post 생성
  /post/new - new post 생성
*/

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
    onClick: (id) => {
      alert(id)
    },
  })

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  })

  this.route = (postId) => {
    const { pathname } = window.location

    if (pathname === '/') {
      if (postId !== undefined) {
        postEditPage.setState({ postId })
      } else {
        postPage.render()
      }
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditPage.setState({ postId })
    }
  }

  this.route()

  window.addEventListener('route-change', (e) => {
    const { id, name } = e.detail

    if (id) {
      // history.pushState(null, null, nextUrl);
      this.route(id)
    } else if (name) {
      postEditPage.setState({ postId: 'new' })
    }
  })
}
