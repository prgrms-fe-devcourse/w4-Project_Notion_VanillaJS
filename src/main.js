import { request } from "./api.js"
import RootDocs from "./RootDocs.js"
import Editor from "./Editor.js"

const $target = document.querySelector('#app')

// const editor = new Editor({
//   $target,
//   initialState: {},
//   onDocsClick: ''
// })

const rootdocs = new RootDocs({
  $target,
  initialState: []
})

const fetchDocs = async () => {
  const docs = await request('/documents')
  rootdocs.setState(docs)
}

fetchDocs()
// const fetchDocument = async () => {
//   const document = await request('/documents/3',{
//     method: 'GET',
//   })
//   editor.setState(document)
// }

// fetchDocument()
