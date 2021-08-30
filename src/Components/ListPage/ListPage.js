import api from "../../api.js";
import { LOCAL_STORAGE_KEY } from "../../constants.js";
import { push, routeName } from "../../router.js";
import { setItem } from "../../storage.js";
import DocumentsList from "./DocumentsList.js";

export default function ListPage({
  $target,
  initialState,
  onGetDocument,
  onCreateDocument,
}) {
  // DOM Create
  const $page = document.createElement("div");
  $page.className = "list-page";

  // state , setState
  // State : {documents:[...] , selectedDocument: Id, toggledDocuments: Map()]}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    documentsList.setState(nextState);
  };
  // Components
  const documentsList = new DocumentsList({
    $target: $page,
    initialState,
    onGetDocument,
    onCreateDocument,
    onToggleDocument: (id) => {
      const { toggledDocuments } = this.state;
      toggledDocuments[id]
        ? delete toggledDocuments[id]
        : (toggledDocuments[id] = true);
      this.setState({ ...this.state, toggledDocuments });
      setItem(LOCAL_STORAGE_KEY.TOGGLED_DOCUMENTS, toggledDocuments);
    },
  });
  // Render
  this.render = () => {
    $target.appendChild($page);
  };
}
