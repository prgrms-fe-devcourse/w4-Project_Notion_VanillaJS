import {
  getRootDocument,
  getContentDocument,
  postDocument,
  putDocument,
  deleteDocument,
} from "../../../api/request.js";
import { push } from "../../router.js";

import PostList from "./PostList.js";
export default function PostsPage({
  $target,
  initialState = [],
  onClick,
  onEraseBtnClick,
  onAddBtnClick,
  onRootAddBtnClick,
}) {
  const $postPage = document.createElement("div");
  $postPage.setAttribute("class", "post");
  $target.appendChild($postPage);

  this.state = initialState;
  this.setState = ({ $target, nextState, type }) => {
    this.state = nextState;
    postList.setState({ $target, nextState, type });
    this.render();
  };

  const postList = new PostList({
    $target: $postPage,
    initialState: this.state,
  });

  this.render = () => {};

  $postPage.addEventListener("click", (e) => {
    const { target } = e;
    const $li = e.target.closest("li");
    if ($li) {
      const id = $li.id;
      push(`/posts/${id}`);
    }
    switch (true) {
      case target.classList.contains("erase-btn"):
        onEraseBtnClick(target.closest("li"));
        break;
      case target.classList.contains("add-btn"):
        onAddBtnClick(target.closest("li"));
        break;
      case target.classList.contains("root-add-btn"):
        onRootAddBtnClick(target);
        break;
      case target.classList.contains("span-tag"):
        onClick(target.closest("li"));
        break;
      default:
        break;
    }
  });

  this.render();
}
