import DocumentPage from "./DocumentPage.js"
import DocumentEditPage from "./DocumentEditPage.js";
import { initRoute } from "../utils/router.js";


export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState : {
      documentId : 'new',
      document : {
        title :'',
        content : ''
      }
    }
  })



    this.route = (parent) => {
        $target.innerHTML = ''
        const {pathname} = window.location
        if(pathname === '/'){
            console.log('hi')
            documentPage.render()
        }else{
            // console.log(parent)
            console.log('bye')

            const [ , id ] = pathname.split('/')
            documentPage.render()
            documentEditPage.setState({
                documentId : id,
                parentId : parent
            })
        }
    }
    
    this.route()
    
    initRoute((parent) => this.route(parent))


}
