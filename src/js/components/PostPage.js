import { request } from "./api.js";
import PostList from "./PostList.js";

export default function PostPage({ $target }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target,
    initialState: [],
  });

  const $newPostButton = document.createElement("button");
  $page.appendChild($newPostButton);
  $newPostButton.textContent = "New Post";

  const fetchPosts = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
  };

  this.render = async () => {
    await fetchPosts();
    $target.appendChild($page);
  };
}
