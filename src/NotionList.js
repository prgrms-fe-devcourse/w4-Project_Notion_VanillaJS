import { push } from "./router.js";

export default function NotionList({ $target, initialState, newDoument }) {
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
      <ul>
      ${data
        .map(
          ({
            title,
            documents,
            id,
          }) => `<li data-id="${id}" class="document-item">${title}
          <button class="plus">+</button>
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
    if ($li) {
      const documentId = $li.dataset.id;
      // push(`/document/${id}`);
      newDoument(documentId);
    }
  });
}
