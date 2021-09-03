import PostPage from "./PostPage.js"
import PostEditPage from "./PostEditPage.js"
import Editor from './Editor.js'
import {initRouter} from './router.js'
import HomePage from './HomePage.js'
import makePage from './listPage.js'



export default function App({$target}){
   /* const postPage = new PostPage ({$target}) */
    
   /* const postEditPage = new PostEditPage({$target,
    initialState :{
        postID:'new',
        post: {
            title:'',
            content:''
        }
    }
     }) 
   */
     
     const homePage = new HomePage({$target})
     

     this.route = () =>{
        
        const {pathname} = window.location

        if(pathname === '/'){
            homePage.render()
        }else if(pathname.indexOf('/list/') === 0){
            
            const [, , postId] = pathname.split('/')
            const listPage = new makePage({$target, 
                initialState:{
                    postId:`${postId}`,
                    post:{
                        title:'',
                        content:''
                    }
                }
            })
        } 
        

    }
    this.route()  
    
    initRouter(()=> this.route())  

}


