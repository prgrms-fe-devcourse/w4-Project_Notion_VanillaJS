import { request } from '../api.js'
import { $creEle } from '../../utils/document.js'
import PostList from './PostList.js'

// 사이드바를  담당하는 페이지
export default function PostPage({ $target }) {
  const $page = $creEle('div')
  $page.className = 'documentList'

  // 실제로는 Api에서 데이터 불러서 보여주는게 맞을듯
  const $userInfo = $creEle('div')
  $userInfo.innerHTML = `
    <h2>김동현님의 Notion</h2>
    <h3>ehehdgus1@hanyang.ac.kr</h3>
  `
  $page.appendChild($userInfo)

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onAttach: async (id) => {
      const post = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: 'untitled',
          parent: id,
        }),
      })
      console.log(post)
      await fetchPosts()
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })

      await fetchPosts()
    },
  })

  const $newPostButton = $creEle('button')
  $page.appendChild($newPostButton)
  $newPostButton.textContent = '+ 새 페이지'
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

  $newPostButton.addEventListener('click', () => {
    window.dispatchEvent(
      new CustomEvent('route-change', {
        detail: {
          nextUrl: '/documents/new',
        },
      }),
    )
  })
}
