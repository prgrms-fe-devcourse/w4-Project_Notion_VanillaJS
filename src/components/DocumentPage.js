import DocumentList from "./DocumentList.js"
import { request } from "../api/api.js"


export default function documentPage({
    $target
}) {
    const $documentPage = document.createElement('div')
    $documentPage.className  = "document-page"
    
    
    
    const documentList = new DocumentList({
        $target,
        initialState :[]
    })

    
    const fetchDocuments = async() => {
    const documents = await request('/')
    documentList.setState(documents)
    }
  
    

    this.render = async() => {
        await fetchDocuments()
        $target.appendChild($documentPage)

    }
}