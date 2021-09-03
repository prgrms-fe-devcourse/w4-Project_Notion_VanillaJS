import DocumentsPage from "./DocumentsPage.js";
import DocumentEditPage from "./DocumentEditPage.js";
import DocumentList from "./documentList.js";
import { initRouter } from "../utils/router.js";

export default function App({ $target }) {
  // const documentsPage = new DocumentsPage({
  //   $target,
  // });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: "new",
      title: "",
      content: "",
    },
  });

  this.route = () => {
    const { pathname } = window.location;
    if (pathname === "/") {
      // documentsPage.render();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // documentsPage.render();
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => this.route());
}
