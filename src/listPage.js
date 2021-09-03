 import { request } from './api.js'
import Editor from './Editor.js'
import {getItem, removeItem,setItem} from './storage.js'
    
export default function makePage({$target,initialState}){

        $target.querySelector('article').innerHTML=`
            <div class="editor"></div>
        `
        const $page = document.querySelector('.editor')    

        this.state = initialState
        
        let timer = null
    
        let postLocalSaveKey = `temp-post-${this.state.postId}`
    
        const post = getItem(postLocalSaveKey,{
            title:'',
            content:''
        })

        const data =  request(`/documents/${this.state.postId}`,{
            method:'GET'
            }).then((list)=>{
                const dataObj = {
                    title: list.title,
                    content: list.content
                }
                return dataObj
            })

        const currentData = async () => {
            const a = await data
            editor.setState(a)
        }
        currentData()

        
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
                  //  console.log(this.state)
                    await request(`/documents/${this.state.postId}`,{
                        method: 'PUT',
                        body:JSON.stringify({
                            title: eventList.title ,
                            content: eventList.content
                        })
                    })
                    removeItem(postLocalSaveKey)
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
    
