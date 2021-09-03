import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"

export default function App({ $target }) {
  const postsPage = new PostsPage ({
    $target,
    // documentHistory: id => PostEditPage
  })

  const postEditPage = new PostEditPage({ $target })

  this.route = () => {
    $target.innerHTML = ''
    const { pathname } = window.location

    if (pathname === '/') {
      postPage.render()
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditPage.setState({ postId })
    }
  }

  this.route()
}