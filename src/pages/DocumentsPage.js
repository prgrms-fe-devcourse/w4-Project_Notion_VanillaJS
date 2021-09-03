import DocumentList from "../components/DocumentList.js";
import { request } from "../api.js";

export default function DocumentsPage({ $target }) {
  const $page = document.createElement("section");

  const documentList = new DocumentList({ $target, initialState: [] });

  const fetchDocuments = async () => {
    const documents = await request(`/documents`);
    documentList.setState(documents);
  };

  this.render = async () => {
    await fetchDocuments();
    $target.appendChild($page);
  };
}
