import {
  getRootDocument,
  getContentDocument,
  postDocument,
  putDocument,
  deleteDocument,
} from "../../api/request.js";
import PostList from "./PostList.js";

export default function PostsPage({
  $target,
  initialState = [],
  onClick,
  onEraseBtnClick,
}) {
  const $postPage = document.createElement("div");
  $postPage.setAttribute("class", "post");
  $target.appendChild($postPage);
  let isFirst = true;

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

  this.render = () => {
    if (isFirst) {
      $postPage.addEventListener("click", (e) => {
        const { target } = e;
        if (target.classList.contains("li-tag")) onClick(target);
        else if (target.classList.contains("btn")) {
          onEraseBtnClick(target.closest("li"));
        }
      });

      isFirst = false;
    }
  };

  this.render();
}
