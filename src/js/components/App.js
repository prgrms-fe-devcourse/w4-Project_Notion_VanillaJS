import PostPage from './SideBar/PostPage.js'
import PostEditPage from './PostMain/PostEditPage.js'

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
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

  this.route = () => {
    const { pathname } = window.location

    if (pathname === '/') {
      postPage.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      console.log(postId)
      postEditPage.setState({ postId })
    }
  }

  this.route()

  window.addEventListener('route-change', (e) => {
    const { nextUrl } = e.detail

    if (nextUrl) {
      history.pushState(null, null, nextUrl)
      this.route()
    }
  })
}
