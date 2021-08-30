import { request } from '../api.js'
import PostList from './PostList.js'

// 사이드바를  담당하는 페이지
export default function PostPage({ $target, onClick }) {
  const $page = document.createElement('div')

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onPostClick: (id) => {
      onClick(id)
    },
  })

  const $newPostButton = document.createElement('button')
  $page.appendChild($newPostButton)
  $newPostButton.textContent = '+ 새로 만들기'
  $newPostButton.className = 'addNew'

  const fetchPosts = async () => {
    const posts = await request('/documents')
    postList.setState(posts)
  }

  this.render = async () => {
    await fetchPosts()
    $target.appendChild($page)
  }

  fetchPosts()

  $page.addEventListener('click', (e) => {
    const { target } = e
    const name = target.className

    window.dispatchEvent(
      new CustomEvent('route-change', {
        detail: {
          name,
        },
      }),
    )
  })
}
