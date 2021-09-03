import { request } from "./api.js"
import PostList from "./PostList.js"

export default function PostsPage({
    $target
}) {
    const $postsPage = document.createElement('div')

    // [게시글 목록 생성]
    const postList = new PostList({
        $target,
        initialState: []
    })
    // [API 게시글 목록 불러오기]
    const fetchPosts = async () => {
        const posts = await request('/posts')
        postList.setState(posts)
    }
    // [게시글 생성하는 버튼]
    const $newPostButton = document.createElement('button')
    $newPostButton.textContent = 'New Post'
    $postsPage.appendChild($newPostButton)

    this.render = async () => {
        await fetchPosts()
        $target.appendChild($postsPage)
    }
}

