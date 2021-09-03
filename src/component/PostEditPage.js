import { request, stringifyBody, parseRes } from "../api.js";
import Editor from "./Editor.js";
import toast from "../toast.js";

export default function PostEditPage({
  $target,
  initialState,
  mainPageId,
  refreshPostList,
}) {
  const $page = document.createElement("div");
  $page.setAttribute("id", "postEditPage");
  this.state = initialState;

  const defaultContent = new Map([
    ["Content", ""],
    ["Comment", ""],
    ["Assign", ""],
    ["State", ""],
    ["Property", ""],
    ["Updated", new Date()],
    ["Due Date", ""],
  ]);

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: {
      title: this.state.post.title,
      content:
        this.state.post.content.size > 0
          ? this.state.post.content
          : defaultContent,
    },
    onEditing: (edited) => {
      // 연속 입력 시에는 이벤트 억제
      if (timer !== null) clearTimeout(timer);
      timer = setTimeout(async () => {
        let stringifiedEdited = stringifyBody(edited);
        parseRes(edited);
        console.log(this.state);
        const isNew = this.state.postId === "new";
        if (isNew) {
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify({
              title: edited.title,
              parent: this.state.parent,
            }),
          });
          history.pushState(null, null, `/documents/${createdPost.id}`);

          this.state.postId = createdPost.id;
        }

        await request(`/documents/${this.state.postId}`, {
          method: "PUT",
          body: stringifiedEdited,
        });

        if (document.querySelector(`#post${this.state.postId}`)) {
          document.querySelector(
            `#post${this.state.postId} .editPostButton`
          ).innerText = edited.title;
        }

        refreshPostList(mainPageId);

        toast("Saved");
      }, 2000);
    },
    onRemove: async (edited) => {
      const { pathname } = window.location;
      const [, , postId] = pathname.split("/");
      const editedJson = stringifyBody(edited);

      await request(`/documents/${postId}`, {
        method: "PUT",
        body: editedJson,
      });
    },
  });

  this.setState = async (nextState) => {
    if (this.state.postId !== nextState.postId) {
      this.state = nextState;

      if (this.state.postId === "new") {
        this.render();
        editor.setState(this.state.post);
      } else {
        await fetchPost();
      }
      return;
    }

    this.state = nextState;
    this.render();
    editor.setState(this.state.post);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { postId } = this.state;
    if (postId !== "new") {
      const post = parseRes(
        await request(`/documents/${postId}`, { method: "GET" })
      );

      this.setState({ ...this.state, post });
    }
  };

  $page.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") == "postEditPage") {
      history.pushState(null, null, "/");
      document.querySelector("#postEditPage").remove();
    }
  });
}
