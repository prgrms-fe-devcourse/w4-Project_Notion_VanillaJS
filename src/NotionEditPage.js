import Editor from "./Editor.js";
import { request } from "./Api.js";

export default function NotionEditPage({ $target, selectedId, update }) {
  const $notion = document.createElement("div");
  $notion.className = "notionEditPage";
  this.state = selectedId;

  let timer = null;

  const editor = new Editor({
    $target: $notion,
    initialState: { title: "", content: "" },
    onEditing: (post) => {
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(() => {
        fetchDocument(post);
      }, 1500);
    },
    onClick: (id) => {
      this.state = { id };
      history.pushState(null, null, `/document/${id}`);
      selectedDocument();
    },
  });

  this.setState = async (nextState) => {
    this.state = nextState;
    await selectedDocument();
    this.render();
  };

  const selectedDocument = async () => {
    const post = await request(`/documents/${this.state.id}`);
    await editor.setState(post);
  };

  const fetchDocument = async (post) => {
    await request(`/documents/${this.state.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    await update();
    await this.render();
  };

  this.render = () => {
    $target.appendChild($notion);
  };
}
