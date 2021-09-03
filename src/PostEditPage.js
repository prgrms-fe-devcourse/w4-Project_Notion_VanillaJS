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

  let subDocuments = [];

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

      const posts = await request("/documents", {
        method: "GET",
      });

      subDocuments = [];
      findSubDocuments(posts, post.id);
      this.subDocumentRender(subDocuments.reverse().slice(1));
    }
  };

  const findSubDocuments = (currentPosts, findId) => {
    for (const document of currentPosts) {
      if (document.id === parseInt(findId)) {
        foundSubDocuments(document);
      }

      if (document.documents.length) {
        findSubDocuments(document.documents, findId);
      }
    }
  };

  const foundSubDocuments = (foundDocument) => {
    if (foundDocument.documents.length) {
      for (const document of foundDocument.documents) {
        foundSubDocuments(document);
      }
    }
    subDocuments.push(foundDocument.id);
  };

  this.subDocumentRender = (subDocumentsId) => {
    editor.subDocumentsRender(subDocumentsId);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    fetchPost();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
