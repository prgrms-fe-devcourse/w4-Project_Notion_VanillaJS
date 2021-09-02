import { push } from "./router.js";

export default function NotionList({
  $target,
  initialState,
  newDocument,
  onRemove,
}) {
  const $notion = document.createElement("div");
  $target.appendChild($notion);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const documentList = documentRecursive(this.state, "");
    $notion.innerHTML = documentList;
  };

  //컴포넌트 랜더링(하위 컴포넌트 포함)
  const documentRecursive = (data, text) => {
    text += `
      <ul  style="margin : 4px;">
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
    const $li = e.target.closest(".document-item");
    const { className } = e.target;

    const { id } = $li.dataset;

    if (className === "remove") {
      onRemove(id);
    } else {
      newDocument(id, className);
    }
  });
}
