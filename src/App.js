import DocsPage from "./DocsPage.js"

export default function App ({ $target }) {
  const docsPage = new DocsPage({ $target })

  docsPage.render()
}