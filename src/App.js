import Header from "./Header.js";
import PostList from "./PostList.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";
import { request } from "./api.js";

export default function App({ $target }) {
  const $postListContainer = document.createElement("div");
  const $editorContainer = document.createElement("div");
  $postListContainer.className = "postList";
  $editorContainer.className = "editor";
  $target.appendChild($postListContainer);
  $target.appendChild($editorContainer);

  let subDocuments = [];

  new Header({
    $target: $postListContainer,
    initialState: { name: "준형" },
  });

  const postList = new PostList({
    $target: $postListContainer,
    initialState: [],
    onClickPost: (currentPosts, currentId) => {
      subDocuments = [];
      findSubDocuments(currentPosts, currentId);
      postEditPage.subDocumentRender(subDocuments.reverse().slice(1));
    },
  });

  const postEditPage = new PostEditPage({
    $target: $editorContainer,
    onTitleChange: () => {
      fetchPostList();
    },
  });

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

  const fetchPostList = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
  };

  this.route = () => {
    fetchPostList();
    const { pathname } = window.location;

    if (pathname.indexOf("/documents/") === 0) {
      const [, , id] = pathname.split("/");
      postEditPage.setState({ id });
      $editorContainer.className = "editor";
    } else if (pathname === "/") {
      $editorContainer.className = "editor invisible";
    }
  };

  this.route();

  initRouter(() => this.route());
}
