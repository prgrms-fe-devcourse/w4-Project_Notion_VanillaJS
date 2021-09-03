import { request } from "./api.js";
import PostList from "./PostList.js";

export default function PostsPage({ $target }) {
  const $page = document.createElement("div");

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };

  const postList = new PostList({
    $target,
    initialState: [],
  });

  this.render = () => {
    $target.appendChild($page);
  };
}
