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

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      documentsPage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      documentsPage.setState();
      const [, , documentId] = pathname.split("/");
      documentEditPage.setState({ documentId });
    }
  };

  this.route();
}
