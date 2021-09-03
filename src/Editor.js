import { request } from "./api.js";
import { push } from "./router.js";

export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  const $subDocuments = document.createElement("div");
  $subDocuments.className = "subDocuments";
  $target.appendChild($editor);
  $target.appendChild($subDocuments);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;

    this.render();
  };

  let isInitialize = false;

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" placeholder="제목 없음" value="${this.state.title}" style="display: block;">
        <textarea name="content" placeholder='명령어 사용 시 "/"를 입력하세요'>${this.state.content}</textarea>
      `;
      isInitialize = true;
    }
  };

  this.render();

  this.subDocumentsRender = async (documentsId) => {
    let subDocuments = [];
    for (const documentId of documentsId) {
      const document = await request(`/documents/${documentId}`, {
        method: "GET",
      });
      subDocuments.push(document);
    }

    if (subDocuments) {
      $subDocuments.innerHTML = `
      <ul>
        ${subDocuments
          .map((post) => `<li data-id="${post.id}">📄 ${post.title ? `${post.title}` : "제목 없음"}</li>`)
          .join("")}
      </ul>
      `;
    }
  };

  $editor.addEventListener("keyup", (e) => {
    const { name } = e.target;
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);
      onEditing(nextState);
    }
  });

  const textArea = document.querySelector("textarea[name=content]");
  textArea.addEventListener("keyup", () => {
    let scrollHeight = textArea.scrollHeight;
    let height = textArea.clientHeight;
    if (scrollHeight > height) {
      textArea.style.height = `${scrollHeight}px`;
    }
  });

  $subDocuments.addEventListener("click", (e) => {
    const { id } = e.target.dataset;
    push(id);
  });
}
