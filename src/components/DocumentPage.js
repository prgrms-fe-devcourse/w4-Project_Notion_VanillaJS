import DocumentList from "./DocumentList.js";
import { request } from "../api/api.js";
import Header from "./Header.js";
import { listRoute } from "../utils/router.js";

export default function documentPage({ $target }) {
  const $documentPage = document.createElement("div");
  $documentPage.className = "document-page";

  new Header({
    $target: $documentPage,
    initialState: "신효정",
  });

  const documentList = new DocumentList({
    $target: $documentPage,
    initialState: [],
  });

  const fetchDocuments = async () => {
    const documents = await request("/");
    documentList.setState(documents);
  };

  this.render = async () => {
    await fetchDocuments();
    $target.prepend($documentPage);
  };

  this.route = (documentTitle) => {
    this.setState();
  };

  listRoute(() => fetchDocuments());
}
