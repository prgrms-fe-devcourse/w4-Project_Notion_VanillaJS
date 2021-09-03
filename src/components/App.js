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

  this.render = () => {
    $target.innerHTML = ''
    const {pathname} = window.location
    const [ , id ] = pathname.split('/')
    documentPage.render()
    documentEditPage.render()
  }

  this.render()




}
