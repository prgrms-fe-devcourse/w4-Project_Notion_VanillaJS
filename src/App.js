import DocumentEditPage from "./pages/DocumentEditPage.js";
import DocumentsPage from "./pages/DocumentsPage.js";

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({ $target });
  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
    },
  });

  documentsPage.render();

  documentEditPage.setState({
    documentId: 9175,
  });
  // documentEditPage.render();
}
