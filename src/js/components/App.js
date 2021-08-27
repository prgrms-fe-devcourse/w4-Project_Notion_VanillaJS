import PostPage from "./PostPage.js";

export default function App({ $target }) {
  const postPage = new PostPage({
    $target,
  });

  postPage.render();
}
