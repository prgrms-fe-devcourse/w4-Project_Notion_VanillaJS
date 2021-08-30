export default function DocumentList({
  $target,
  init = [],
  onSelect,
  onCreate,
  onRemove,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "document-list-container";
  $target.appendChild($documentList);

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
          ${
            documents.length > 0
              ? `<ul class='sub-document fold'>${renderDocuments(
                  documents
                )}</ul>`
              : `<ul class='sub-document fold'><li class="document-item sub-document__none-guide">하위 문서가 없습니다.</li></ul> `
          }
          </li>
      `
      )
      .join("");
  };

  this.state = init;
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    $documentList.innerHTML = `
        <ul class="root">
        ${this.state.length > 0 && renderDocuments(this.state)}
        </ul>
        `;
  };

  // mouse over 및 out 시 문서 추가버튼 구현
  $documentList.addEventListener("mouseover", (e) => {
    e.target.style.background = "#EFEFEF";
    const $li = e.target.closest(".document-item");
    const $addButton = $li.querySelector(".add");
    const $removeButton = $li.querySelector(".remove");
    if ($addButton || $removeButton) {
      $addButton.classList.toggle("fold");
      $removeButton.classList.toggle("fold");
    }
  });
  $documentList.addEventListener("mouseout", (e) => {
    e.target.style.background = "#F7F6F3";
    const $li = e.target.closest(".document-item");
    const $addButton = $li.querySelector(".add");
    const $removeButton = $li.querySelector(".remove");
    if ($addButton || $removeButton) {
      $addButton.classList.toggle("fold");
      $removeButton.classList.toggle("fold");
    }
  });

  $documentList.addEventListener("click", async (e) => {
    const $li = e.target.closest(".document-item");
    const { id } = $li.dataset;
    const { className } = e.target;
    if (className === "document-item") {
      onSelect(id);
    } else if (className === "document-item__button add") {
      onCreate(id);
    } else if (className === "document-item__button folder") {
      const $ul = $li.querySelector(".sub-document");
      if ($ul) {
        e.target.style.transform = $ul.classList.contains("fold")
          ? "rotate(90deg)"
          : "";
        $ul.classList.toggle("fold");
      }
    } else if (className === "document-item__button remove") {
      onRemove(id);
    }
  });

  this.render();
}
