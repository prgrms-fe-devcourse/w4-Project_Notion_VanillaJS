import { request, stringifyBody, parseRes } from "../api.js";
import Editor from "./Editor.js";
import toast from "../toast.js";

const defaultContent = new Map([
  ["Content", "Nothing"],
  ["Comment", ""],
  ["Assign", ""],
  ["State", ""],
  ["Property", ""],
  ["Updated", new Date()],
  ["Due Date", ""],
]);

export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.setAttribute("class", "headerBox");
  $target.appendChild($header);

  const $headerTitle = document.createElement("h1");
  $headerTitle.setAttribute("class", "headerTitle");
  $header.appendChild($headerTitle);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    if (this.state.id == "initialPage") {
      return;
    }
    // Root Document의 0번 인덱스를 Header로 지정
    this.state.id = this.state.id
      ? this.state.id
      : (await request(`/documents/`, { method: "GET" }))[0].id;

    const headerRes = await request(`/documents/${this.state.id}`, {
      method: "GET",
    });

    const headerInfo = parseRes(headerRes);

    $headerTitle.innerHTML = headerInfo.title;
    this.state = {
      ...this.state,
      title: headerInfo.title,
      content:
        headerInfo.content.size > 0 ? headerInfo.content : defaultContent,
    };
  };

  let timer = null;

  $headerTitle.addEventListener("click", () => {
    history.pushState(null, null, `/documents/${this.state.id}`);

    const $postEditPage = document.createElement("div");
    $postEditPage.setAttribute("id", "postEditPage");
    $header.appendChild($postEditPage);

    new Editor({
      $target: postEditPage,
      initialState:
        $target.getAttribute("id") == "sideMenu"
          ? { ...this.state, target: "notion title" }
          : this.state,
      onEditing: async (edited) => {
        // 연속 입력 시에는 이벤트 억제
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(async () => {
          const { pathname } = window.location;
          const [, , postId] = pathname.split("/");
          const editedJson = stringifyBody(edited);
          parseRes(edited);

          await request(`/documents/${postId}`, {
            method: "PUT",
            body: editedJson,
          });

          const headerTitleNow =
            $header.querySelector(".headerTitle").innerHTML;

          if (edited.title !== headerTitleNow) {
            $header.querySelector(".headerTitle").innerHTML = edited.title;
          }

          if (edited.target == "notion title") {
            document.querySelector(
              "#sideMenu .headerBox .headerTitle"
            ).innerHTML = edited.title;
          } else {
            document.querySelector(
              "#sideListBox .listTitle.nowOpened .openListButton"
            ).innerHTML = edited.title;
          }

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

        toast("Removed");
      },
    });
  });

  this.render();

  $header.addEventListener("click", (e) => {
    if (e.target.getAttribute("id") == "postEditPage") {
      history.pushState(null, null, "/");
      document.querySelector("#postEditPage").remove();
    }
  });
}
