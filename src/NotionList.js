import { push } from "./router.js";

export default function NotionList({
  $target,
  initialState,
  newDocument,
  onRemove,
}) {
  const $notion = document.createElement("div");
  $notion.className = "notionList";
  $target.appendChild($notion);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const documentList = documentRecursive(this.state, "");
    const rootButton =
      "<button class='plus document-item rootButton'>+ 페이지 추가</button>";

    $notion.innerHTML = `<div class="title">파트로의 Notion</div>${documentList} ${rootButton}`;
  };

  //컴포넌트 랜더링(하위 컴포넌트 포함)
  const documentRecursive = (data, text) => {
    text += `
      <ul>
      ${data
        .map(
          ({
            title,
            documents,
            id,
          }) => `<li data-id="${id}" class="document-item">${title}
          <button class="plus">+</button>
          <button class="remove">-</button>
          </li>
            ${documents
              .map((document) => documentRecursive([document], text))
              .join("")}
            `
        )
        .join("")}
      </ul>
      `;
    return text;
  };
  this.render();

  $notion.addEventListener("click", (e) => {
    const { className } = e.target;
    const $li = e.target.closest(".document-item");

    if ($li) {
      const id = $li.dataset?.id ?? null;

      if (className === "remove") {
        onRemove(id);
      } else {
        newDocument(id, className);
      }
    }
  });
}
