import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"
import { initRouter } from "./router.js"


export default function App({$target}){
    
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
            postsPage.deletFirstPage()
            const [, , postId,parent,retitle] = pathname.split('/')
            const decodeRetitle=decodeURIComponent(retitle)
            if(parent!=''&& parent!='recover'){
                postEditPage.setState({postId,parent})
            }
            else if(decodeRetitle){
                postEditPage.setState({postId,decodeRetitle})
            }
            else{
            postEditPage.setState({postId})
            }

        }
        




    }

    this.route()

    initRouter( () => this.route() )




}