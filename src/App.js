import PostPage from './PostPage.js'
import PostEditPage from './PostEditPage.js'
import { initRouter } from './router.js'

export default function App({ $target }) {
  const $documentList = document.createElement('div')
  const $documentContent = document.createElement('div')

  $target.appendChild($documentList)
  $target.appendChild($documentContent)

  const postPage = new PostPage({
    $target:$documentList,
  })

  const postEditPage = new PostEditPage({
    $target:$documentContent,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: ''
      }
    }
  })

  this.route = () => {
    const { pathname } = window.location

    if (pathname === '/') {
      postPage.render()
    } else if (pathname.indexOf('/posts/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditPage.setState({ postId })
    }
  }

  this.route()

  initRouter(() => this.route())

}