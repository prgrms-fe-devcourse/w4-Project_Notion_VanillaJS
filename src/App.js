import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"
import { initRouter } from "./router.js"
import FirstPage from "./FirstPage.js"
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
            
            //postsPage.deletfirstPage()

        }else if(pathname.indexOf('/documents/')===0){
            postsPage.deletfirstPage()
            const [, , postId,parent,retitle] = pathname.split('/')
            const decodeRetitle=decodeURIComponent(retitle)
            console.log(pathname.split('/'))
            if(parent!=''&& parent!='recover'){
                postEditPage.setState({postId,parent})
            }
            else if(decodeRetitle){
                postEditPage.setState({postId,decodeRetitle})
            }
            else{
                console.log({postId})
            postEditPage.setState({postId})
            }

        }
        




    }

    this.route()

    initRouter( () => this.route() )




}