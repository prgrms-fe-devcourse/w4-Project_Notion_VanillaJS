import api from "../../api.js";
import { push, routeName } from "../../router.js";
import DocumentsList from "./DocumentsList.js";

export default function ListPage({ $target, initialState }) {
  let isInit = false;
  // DOM Create
  const $page = document.createElement("div");
  $page.className = "list-page";

  // state , setState
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };
  // Components
  const documentsList = new DocumentsList({
    $target: $page,
    initialState: {
      documents: [],
      selectedDocument: null,
      toggledDocuments: new Map(),
    },
    onGetDocument: (documentId) => {
      push(`/${routeName.document}/${documentId}`);
    },
    onCreateDocument: async (parent = null) => {
      const $newDocument = await api.createDocument({
        title: "새로운 Document",
        parent,
      });
      documentsList.render();
      return $newDocument;
    },
  });
  // Render
  this.render = () => {
    $target.appendChild($page);
    documentsList.render();
  };
}
