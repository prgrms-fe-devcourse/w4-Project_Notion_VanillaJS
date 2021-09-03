import DocumentPage from "./DocumentPage.js"


export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  documentPage.render()
}
