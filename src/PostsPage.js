import { request } from "./api.js"
import { removeItem,getItem } from "./storage.js"
import { push } from "./router.js"
import PostList from "./PostList.js"
import LinkButton from "./LinkButton.js"
import PostListTrash from "./PostListTrash.js"
import FirstPage from "./FirstPage.js"


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

            const findChildForRemove=(docsObj,docsId)=>{
                const checkDocumetToremove=docsObj.map(findDocs=>findDocs.documents)
                for(let i in checkDocumetToremove){
                    for(let j=0;j<checkDocumetToremove[i].length;j++){
                        console.log(checkDocumetToremove[i])
                        if(checkDocumetToremove[i].length!=0 && docsId===checkDocumetToremove[i][j].id){
                            console.log(checkDocumetToremove[i][j].id)
                            docsIndex=checkDocumetToremove[i].findIndex(docs=>docs.id===docsId)
                            console.log('index',docsIndex)
                            if(docsIndex===-1)
                            {
                                findChildForRemove(checkDocumetToremove,docsId)
                            }
                            else{
                                postListTrash.setState(checkDocumetToremove[i][docsIndex])
                                checkDocumetToremove[i].splice(docsIndex,1)
                            return console.log('Sucess childRemove')
                            }
                        }
                    }
                }
                for(let i in checkDocumetToremove){
                    if(checkDocumetToremove[i].length!=0){
                        findChildForRemove(checkDocumetToremove[i],docsId)
                    }
                }
                
            }
            const docsId=parseInt(Id)
            let docsIndex=postList.state.findIndex(docs=>docs.id===docsId)
            if(docsIndex===-1){
                findChildForRemove(postList.state,docsId)
                await request(`/documents/${Id}`,
                {method:'DELETE'})
                postList.setState(postList.state)
                return
            }
    
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
        
        },
        onRecover:(Id,title)=>{
            const recoverTitle=title
            const recoverId=parseInt(Id)
            let docsIndex=postListTrash.state.findIndex(docs=>docs.id===recoverId)
            removeItem(`temp-trash-${recoverId}`)
            postListTrash.state.splice(docsIndex,1)
            postListTrash.Eventrender()
            push(`/documents/new/recover/${recoverTitle}`)
            
        },
        onRemoveAllTrash:()=>{
            for (let i in window.localStorage){
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
        firstPage.render()
    }
    this.deletFirstPage= ()=>{
        firstPage.deleteFirstPageRender()
    }




    this.render= async ()=>{
        $target.appendChild($page)
    }

}