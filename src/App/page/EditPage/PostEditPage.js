import { postDocument } from "../../../api/request.js";
import { getItem, setItem } from "../storage.js";
import Editor from "./Editor.js";

export default function PostEditPage({
  $target,
  initialState,
  onEditing,
  onPosting,
}) {
  const $page = document.createElement("div");
  $page.setAttribute("class", "edit");
  this.state = initialState;
  // const TEMP_POST_SAVE_KEY = `temp-post-${this.state.id}`;
  //
  // const post = getItem(TEMP_POST_SAVE_KEY, {
  //   title: "",
  //   content: "",
  // });

  const editor = new Editor({
    $page,
    initialState: {
      title: "오늘의 학습일지",
      content: "TypeScript",
    },
  });

  this.setState = async ({ $target, nextState }) => {
    console.log($target, nextState, $page);
    this.state = nextState;
    this.render();
    editor.setState({ $target, nextState });
  };

  let isFirst = true;
  this.render = () => {
    if (isFirst) {
      $target.appendChild($page);
      isFirst = false;
    }
  };

  $page.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      // title과 content인 곳에서만 반응하게하는 방어코드
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.state = nextState;
      this.setState({ $target, nextState });
      onEditing(this.state);
    }
  });

  $page.addEventListener("click", (e) => {
    const { target } = e;
    if (target.id === "edit-btn") {
      onPosting({$target : target,nextState : this.state , type : 'edit-btn-click'});
    }
  });

  this.render();

  const fetchPost = async () => {
    const { postId } = this.state;

    if (postId !== "new") {
      const post = await postDocument(`${postId}`);

      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
