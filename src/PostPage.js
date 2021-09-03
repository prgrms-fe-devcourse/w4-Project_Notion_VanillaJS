import PostList from './PostList.js'
import {request} from './api.js'

export default function PostPage({$target}){
    const $page = document.createElement('div')
    const sideBar = $target.querySelector('nav')
    const mainName = document.createElement('div')
    sideBar.appendChild(mainName)
    sideBar.appendChild($page)

    mainName.innerHTML =`<a href="/" ><b>Heejin's</b> Notion </a>`
    mainName.classList.add('main-title')
    $page.classList.add('pages-lists') 
    
    console.log('yes in post')
    const postList = new PostList({
        $target: $page ,
        initialState:[],
        removeList :async(id) => {
            await request(`/documents/${id}`,{
                method: 'DELETE'
            })
            this.setState()
        },
        addNewList : async(content) => {
            await request(`/documents`,{
                method: 'POST',
                body: JSON.stringify({
                    title: content,
                    parent: null
                })
            }) 
            this.setState() 
            
        } 
    })

    this.setState = async() => {
        const posts = await request('/documents',{
            method : 'GET'
        })
        postList.setState(posts)
        this.render() 

    } 
    this.render = () =>{
      sideBar.appendChild($page)
    }
    this.render()
}
