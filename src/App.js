import DocumentsPage from "./pages/DocumentsPage.js";
import { request } from "./api.js";

export default function App({ $target }) {
  const documentsPage = new DocumentsPage({ $target });

  documentsPage.render();
}
