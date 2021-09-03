import PostList from "./PostList.js"
import LinkButton from "./LinkButton.js"
import PostListTrash from "./PostListTrash.js"
import FirstPage from "./FirstPage.js"
import { request } from "./api.js"

import { removeItem,getItem } from "./storage.js"
import { push } from "./router.js"
export default function PostsPage({
    $target,
    
}){
    const firstPage = new FirstPage({
        $target
    })
    const $page = document.createElement('div')
    $page.className='postlist'

    const postList=new PostList({
        $target:$page,
        initialState:[],
        onRemove: async (Id)=>{

            const findChild=(docsObj,docsId)=>{
                const checkDocumetToremove=docsObj.map(findDocs=>findDocs.documents)
                console.log(checkDocumetToremove)
                for(let i in checkDocumetToremove){
                    for(let j=0;j<checkDocumetToremove[i].length;j++){
                        console.log(checkDocumetToremove[i])
                        if(checkDocumetToremove[i].length!=0 && docsId===checkDocumetToremove[i][j].id){
                            console.log(checkDocumetToremove[i][j].id)
                            docsIndex=checkDocumetToremove[i].findIndex(docs=>docs.id===docsId)
                            console.log('index',docsIndex)
                            if(docsIndex===-1)
                            {
                                findChild(checkDocumetToremove,docsId)
                            }
                            else{
                                postListTrash.setState(checkDocumetToremove[i][docsIndex])
                                checkDocumetToremove[i].splice(docsIndex,1)
                            return console.log('Sucess childRemove')
                            }
                        }
                    }
                }
                console.log(checkDocumetToremove)
                for(let i in checkDocumetToremove){
                    if(checkDocumetToremove[i].length!=0){
                        findChild(checkDocumetToremove[i],docsId)
                    }
                }
                
            }
            const docsId=parseInt(Id)
            console.log('id',docsId)
            console.log('state',postList.state)
            let docsIndex=postList.state.findIndex(docs=>docs.id===docsId)
            if(docsIndex===-1){
                findChild(postList.state,docsId)
                await request(`/documents/${Id}`,
                {method:'DELETE'})
                postList.setState(postList.state)
                return
            }
            
            console.log(docsIndex)
            console.log('index',docsIndex)
            console.log('state',postList.state)
            console.log(postList.state[docsIndex])
            console.log(postList.state[docsIndex].title)
            postListTrash.setState(postList.state[docsIndex])
            postList.state.splice(docsIndex,1)

            postList.setState(postList.state)
            await request(`/documents/${Id}`,
            {method:'DELETE'})
            postList.setState(postList.state)
        },
        onAdd: async(Id)=>{

        }
        
    })
    // const $lButton = document.createElement('button')
    // $page.appendChild($lButton)
    new LinkButton({
        $target:$page,
        initialState:{
            text:"\u00A0 ┼ \u00A0 페이지 추가",
            link:'/documents/new',
            buttonClassName:'addPageButton',
        }
    })

    const postListTrash=new PostListTrash({
        $target:$page,
        initialState:[],
        onHardRemove: (Id)=>{
        alert('영구삭제 하시겠습니까?')
        const docsId=parseInt(Id)
        let docsIndex=postListTrash.state.findIndex(docs=>docs.id===docsId)
        removeItem(`temp-trash-${docsId}`)
        postListTrash.state.splice(docsIndex,1)
        postListTrash.Eventrender()
        console.log(docsId)
        
        },
        onRecover:(Id,title)=>{
            const recoverTitle=title
            const recoverId=parseInt(Id)
            let docsIndex=postListTrash.state.findIndex(docs=>docs.id===recoverId)
            removeItem(`temp-trash-${recoverId}`)
            postListTrash.state.splice(docsIndex,1)
            postListTrash.Eventrender()
            console.log(recoverTitle)
            console.log(`documents/new/recover/${recoverTitle}`)
            push(`/documents/new/recover/${recoverTitle}`)
            
        },
        onRemoveAllTrash:()=>{
            for (let i in window.localStorage){
                console.log(window.localStorage[i])
                console.log(getItem(i))
                if(getItem(i)!=undefined){
                    removeItem(i)
                }
            }
            postListTrash.state=[]
            postListTrash.Eventrender()
            push('/')


        }

    })


    this.setState= async()=>{
        const documents= await request('/documents')
        postList.setState(documents)
        postListTrash.forRender()
        this.render()
        //firstPage.render()
    }
    this.deletfirstPage= ()=>{
        firstPage.deleteRender()
    }




    this.render= async ()=>{
        $target.appendChild($page)
    }

}