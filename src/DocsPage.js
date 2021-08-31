import { request } from "./api.js"
import RootDocs from "./RootDocs.js"
import LinkButton from "./LinkButton.js"

export default function DocsPage({
  $target,
}) {
  const $page = document.createElement('div')

  const rootdocs = new RootDocs({
    $target: $page,
    initialState: [],
  })

  new LinkButton({
    $target: $page,
    initialState: {
      text: '문서작성',
      link: '/posts/new'
    }
  })
  
  this.setState = async () => {
    const docs = await request('/posts')
    rootdocs.setState(docs)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }
}