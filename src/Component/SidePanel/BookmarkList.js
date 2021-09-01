export default function BookmarkList({ $target, init = [] }) {
  const $bookmarkList = document.createElement("div");
  $bookmarkList.className = "document-list-container";
  $target.appendChild($bookmarkList);
  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  // 재귀를 활용한 노션 리스트
  const renderDocuments = (parentsDocuments) => {
    return parentsDocuments
      .map(
        ({ id, title, documents }) =>
          `<li class='document-item' data-id="${id}">
        <button class="document-item__button folder">►</button>
        ${title}
        <button class="document-item__button add fold">+</button>
        <button class="document-item__button remove fold">-</button>
        <button class="document-item__button bookmark">☆</button>
        ${
          documents.length > 0
            ? `<ul class='sub-document fold'>${renderDocuments(documents)}</ul>`
            : `<ul class='sub-document fold'><li class="document-item sub-document__none-guide">하위 문서가 없습니다.</li></ul> `
        }
        </li>
    `
      )
      .join("");
  };
  this.render = () => {
    $bookmarkList.innerHTML = `
        <ul class="root">
          ${this.state.length > 0 && renderDocuments(this.state)}
        </ul>
        `;
  };
  this.render();
}
