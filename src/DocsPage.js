import { request } from "./api.js"
import RootDocs from "./RootDocs.js"

export default function DocsPage({
  $target
}) {
  const $page = document.createElement('div')

  const rootdocs = new RootDocs({
    $target,
    initialState: []
  })

  const $newDocumentButton = document.createElement('button')
  $newDocumentButton.textContent = "문서 작성"
  $page.appendChild($newDocumentButton)

  const fetchDocs = async () => {
    const docs = await request('/documents')
  
    rootdocs.setState(docs)
  }

  this.render = async () => {
    await fetchDocs()
    $target.appendChild($page)
  }
}