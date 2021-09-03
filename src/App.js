import Header from "./Header.js";
import PostsPage from "./PostsPage.js";
import PostEditPage from "./PostEditPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  const $postListContainer = document.createElement("div");
  const $editorContainer = document.createElement("div");
  $postListContainer.className = "postList";
  $editorContainer.className = "editor";

  $target.appendChild($postListContainer);
  $target.appendChild($editorContainer);

  new Header({
    $target: $postListContainer,
    initialState: { name: "준형" },
  });

  const postsPage = new PostsPage({
    $target: $postListContainer,
  });

  const postEditPage = new PostEditPage({
    $target: $editorContainer,
    onTitleChange: () => {
      postsPage.setState();
    },
  });

  this.route = () => {
    postsPage.setState();
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
