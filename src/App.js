import DocsPage from "./DocsPage.js"
import DocEditPage from "./DocEditPage.js"


// url 규칙
// 루트: DocsPage 그리기

// /docs/{id} - id에 해당하는 posts 생성
// /docs/new - 새 post 생성

export default function App ({ $target }) {
  const docsPage = new DocsPage({ $target })
  const docsEditPage = new DocEditPage({ $target, initialState: {
    documentId: 'new',
  }})


  this.route = () => {
    const { pathname } = window.location

    if (pathname === '/') {
      docsPage.render()
    } else if (pathname.indexOf('/posts/') === 0) {
      const [, , documentId ] = pathname.split('/')
      docsEditPage.setState({ documentId })
    }



    console.log(pathname);
  }

  this.route()
}