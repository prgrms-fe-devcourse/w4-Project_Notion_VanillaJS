import PostList from "./PostList.js"
import { request } from "../api/api.js"

const $target = document.querySelector('#app')

const postList = new PostList({
    $target,
    initialState :[]
})

const fetchPosts = async() => {
  const posts = await request('/')
  postList.setState(posts)
}

fetchPosts()