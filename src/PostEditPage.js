import { request } from "./api.js";
import Editor from "./Editor.js";

export default function PostEditPage({
  $target,
  initialState = {
    id: null,
    title: "",
    content: "",
  },
  onTitleChange,
}) {
  const $page = document.createElement("div");

  this.state = initialState;

  const editor = new Editor({
    $target,
    initialState: {
      id: null,
      title: this.state.title,
      content: this.state.content,
    },
    onEditing: async (post) => {
      await request(`/documents/${this.state.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: post.title,
          content: post.content,
        }),
      });
      onTitleChange();

      this.state = {
        ...this.state,
        title: post.title,
        content: post.content,
      };
    },
  });

  const fetchPost = async () => {
    const { id } = this.state;
    if (id) {
      const post = await request(`/documents/${id}`, {
        method: "GET",
      });

      this.state = post;

      editor.setState(
        this.state || {
          id: null,
          title: "",
          content: "",
        }
      );
    }
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    fetchPost();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
