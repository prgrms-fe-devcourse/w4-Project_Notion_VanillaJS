import { request } from './api.js'
import Editor from './Editor.js'
import {getItem, setItem} from './storage.js'

export default function PostEditPage({$target,initialState}){
    const $page = document.createElement('div')
    $page.classList.add('editor')
    $target.querySelector('article').appendChild($page)

    this.state = initialState
    
    let timer = null

    let postLocalSaveKey = `temp-post-${this.state.postId}`

    const post = getItem(postLocalSaveKey,{
        title:'',
        content:''
    })
    
    const editor = new Editor({
        $target :$page,
        initialState: post,
        onEditing:async(eventList) => {
            if(timer!== null){
                clearTimeout(timer)
            }
            clearTimeout(timer)
            timer = setTimeout(async()=>{
                setItem(postLocalSaveKey,{
                    ...eventList,
                    tempSaveDate: new Date()
                })
                
             /* const isNew = this.state.id ==='new'
             await request('/documents',{
                method: 'POST',
                body: JSON.stringify({
                    title : "제목",
                    parent : null
                })
            }) */
            },2000)
            
            
        }
    })

    


}
