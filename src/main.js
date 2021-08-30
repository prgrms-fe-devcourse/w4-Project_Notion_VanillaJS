import { request } from "./api.js"
import RootDocs from "./RootDocs.js"

const $target = document.querySelector('#app')

const rootdocs = new RootDocs({
  $target,
  initialState: []
})

const fetchDocs = async () => {
  const docs = await request('/documents')

  rootdocs.setState(docs)
}

fetchDocs()
