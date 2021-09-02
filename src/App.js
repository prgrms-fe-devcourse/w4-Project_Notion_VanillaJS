import DocumentList from "./DocumentList.js";
import Editor from "./Editor.js";
import { request } from "./api.js"

export default function App ({ $target }) {
  const documentList = new DocumentList({ 
    $target,
    initialState: []
   })

  const fetchDocumentList = async () => {
    const docList = await request(`/documents`)
    documentList.setState(docList)
  }
  fetchDocumentList()


  // this.route = () => {
  //   $target.innerHTML = ''
  //   const { pathname } = window.location

  //   if (pathname === '/') {
  //     postsPage.setState()
  //   } else if (pathname.indexOf('/posts/') === 0 ) {
  //     const [, , postId] = pathname.split('/')
  //     postEditPage.setState({ postId })
  //   }
  // }
  // this.route()
  // initRouter(() => this.route())
}