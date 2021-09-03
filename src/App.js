import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"
import { initRouter } from "./router.js"
export default function App({$target}){
    
    //const $userListContainer = document.createElement('div')
    //const $documentContainer = document.createElement('div')
    //$target.appendChild($documentContainer)

    //$target.appendChild($todoListContainer)
    const postsPage = new PostsPage({
        $target,
    })
    const postEditPage = new PostEditPage({
        $target,
        initialState: {
            posdtId: 'new',

            post: {
                title: '',
                content: '',
                parent:null,
            }
        }
    })

    this.route = ()=>{
        
        
        
        

        const {pathname} = window.location

        if(pathname==='/'){
            $target.innerHTML=''
            postsPage.setState()
        }else if(pathname.indexOf('/documents/')===0){
            const [, , postId,parent,retitle] = pathname.split('/')

            if(parent&& parent!='recover'){
                postEditPage.setState({postId,parent})
            }
            else if(retitle){
                postEditPage.setState({postId,undefined,retitle})
            }
            else{
            postEditPage.setState({postId})
            }

        }
        




    }

    this.route()

    initRouter( () => this.route() )




}