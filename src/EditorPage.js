import Editor from "./Editor.js";
import { request } from "./util/api.js";

export default function EditorPage({ $target, initialState, onChange }) {
  const $editorPage = document.createEvent('div');
  $editorPage.className = 'editor-page';

  const $editor = new Editor({
    $target: $editorPage,
    initialState,
    onEdit: () => {}
  });

  const fetchPosts = async () => {

  }
}
