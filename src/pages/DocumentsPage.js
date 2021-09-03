import DocumentList from "../components/DocumentList.js";
import { request } from "../api.js";

export default function DocumentsPage({ $target }) {
  const $page = document.createElement("section");

  const documentList = new DocumentList({ $target, initialState: [] });

  this.setState = async () => {
    const documents = await request(`/documents`);
    documentList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
