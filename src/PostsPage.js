import { request } from "./api.js"
import PostList from "./PostList.js"

export default function PostsPage({ $target }) {
  const $page = document.createElement('div')

  this.state = initialState

  const postList = new PostList({
    $target: $page,
    initialState: []
  })

  const fetchPosts = async () => {
    const posts = await request('/documents')

    this.setState(posts)
  }

  this.setState = nextState => {
    this.state = nextState
    postList.setState(nextState)
    
    this.render()
  }

  this.render = async () => {
    await fetchPosts()
    $target.appendChild($page)
  }
}