import api from "../../api.js";
import { LOCAL_STORAGE_KEY } from "../../constants.js";
import { push, routeName } from "../../router.js";
import { setItem } from "../../storage.js";
import DocumentsList from "./DocumentsList.js";
import FavoriteDocumentsList from "./FavoriteDocumentsList.js";

export default function ListPage({
  $target,
  initialState,
  onGetDocument,
  onCreateDocument,
  onToggleDocument,
}) {
  // DOM Create
  const $page = document.createElement("div");
  $page.className = "list-page";

  // state , setState
  // State : {documents:[...] , selectedDocument: Id, toggledDocuments: {}, favoriteDocuments: {}}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    favoriteList.setState(this.state.favoriteDocuments);
    documentsList.setState(this.state);
  };
  // Components
  const favoriteList = new FavoriteDocumentsList({
    $target: $page,
    initialState: this.state.favoriteDocuments,
  });
  const documentsList = new DocumentsList({
    $target: $page,
    initialState,
    onGetDocument,
    onCreateDocument,
    onToggleDocument,
  });
  // Render
  this.render = () => {
    $target.appendChild($page);
  };
}
