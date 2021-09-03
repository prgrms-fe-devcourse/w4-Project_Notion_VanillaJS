import DocumentPage from "./DocumentPage.js"
import DocumentEditPage from "./DocumentEditPage.js";


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
  
  documentPage.render()
  documentEditPage.setState({
      documentId : 7464
  })

}
