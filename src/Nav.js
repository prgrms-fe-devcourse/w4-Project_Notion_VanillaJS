import PostList from './PostList.js'
import {request} from './api.js'

export default function Navigation({$target}){
    const $page = document.createElement('div')
    const sideBar = $target.querySelector('nav')
    
    sideBar.appendChild($page)
    $page.classList.add('pages-lists')
    
    const postList = new PostList({
        $target: $page ,
        initialState:[],
        removeList :async(id) => {
            
            const parent =  await request(`/documents/${id}`,{
                method: 'GET'
            })
            if(parent.documents){
                if(window.confirm("하위 파일들도 삭제 할까요?")){
                    parent.documents.map(list=> {
                        const listId = list.id
                         request(`/documents/${listId}`,{
                            method: 'DELETE'
                        })
                    })
                    await request(`/documents/${id}`,{
                        method: 'DELETE'
                    })
                }else{
                    await request(`/documents/${id}`,{
                        method: 'DELETE'
                    })
                }
            }else{
                await request(`/documents/${id}`,{
                    method: 'DELETE'
                })
            }
         /*   await request(`/documents/${id}`,{
                method: 'DELETE'
            }) */
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
        
        },
        addInheritList : async(content) => {
            await request(`/documents`,{
                method: 'POST',
                body: JSON.stringify({
                    title: content.title,
                    parent: content.id
                })
            }) 
            this.setState() 
        
        },
        findInherit : async(id, parentList) => {
           const parent =  await request(`/documents/${id}`,{
                method: 'GET'
            }) 
            const childLists = parent.documents
            console.log(parent.documents.map(list=>list.id))
            
            
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
    this.setState()
}
