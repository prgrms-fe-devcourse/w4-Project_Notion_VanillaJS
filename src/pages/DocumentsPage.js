import DocumentList from "../components/DocumentList.js";
import { request } from "../api.js";
import LinkButton from "../components/LinkButton.js";

export default function DocumentsPage({ $target }) {
  const $page = document.createElement("section");

  new LinkButton({
    $target: $page,
    initialState: {
      text: "새 문서",
      link: "/documents/new",
    },
    className: "addBtn",
  });

  const documentList = new DocumentList({ $target: $page, initialState: [] });

  this.setState = async () => {
    const documents = await request(`/documents`);
    documentList.setState(documents);
    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
