import PostList from "./PostList.js"
import { request } from "../api/api.js"


export default function PostPage({
    $target
}) {
    const $postPage = document.createElement('div')
    $postPage.className  = "post-page"
    
    
    
    const postList = new PostList({
        $target,
        initialState :[]
    })

    
    const fetchPosts = async() => {
    const posts = await request('/')
    postList.setState(posts)
    }
  
    

    this.render = async() => {
        await fetchPosts()
        $target.appendChild($postPage)

    }
}