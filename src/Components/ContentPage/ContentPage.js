import api from "../../api.js";
import { push } from "../../router.js";
import ContentSettings from "./ContentSettings.js";
import Editor from "./Editor.js";

export default function ContentPage({
  $target,
  initialState,
  onUpdateDocument,
  onDeleteDocument,
}) {
  const $page = document.createElement("div");
  $page.className = "content-page";
  // State , setState
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state.selectedDocument);
    settings.setState(this.state.selectedDocument);
  };

  // Component
  const settings = new ContentSettings({
    $target: $page,
    initialState: this.state.selectedDocument,
    onDeleteDocument,
  });

  const editor = new Editor({
    $target: $page,
    initialState: this.state.selectedDocument,
    onUpdateDocument,
  });

  // Render

  this.render = () => {
    $target.appendChild($page);
  };
}
