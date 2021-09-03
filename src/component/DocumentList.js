import { request } from "../utils/api.js";
import { push } from "../utils/router.js";

export default function DocumentList({
  initialState,
  toRootPage,
  onToggle,
  onRemove,
  addDocument,
}) {
  const $documentList = document.querySelector("aside");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (State) => {
    return State.map(
      ({ id, title, documents }) =>
        `<li class="li-document" data-id="${id}">
            <button class="toggle-document">▶</button>
            <span class="li-text">${title}</span>
            <button class="add-document">+</button>
            <button class="remove-document">...</button>
            ${
              documents.length > 0
                ? `<ul class="document-child">${renderDocuments(
                    documents
                  )}</ul>`
                : `<ul class="empty-document">하위 문서가 없습니다.</ul>`
            }
        </li>`
    ).join("");
  };

  this.render = () => {
    $documentList.innerHTML = `<div id="aside-header">
      <span class="aside-header-title">개인 페이지</span>
      <button class="add-root-document">+</button>
    </div>
    <div id="aside-document">
      ${renderDocuments(this.state)}  
    </div>`;
  };

  $documentList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { className } = e.target;

    if ($li) {
      const { id } = $li.dataset;
      if (className === "li-text") {
        push(`/documents/${id}`);
      } else if (className === "toggle-document") {
        const $innerUl = $li.querySelector("ul");
        onToggle($innerUl);
      } else if (className === "remove-document") {
        onRemove(id);
      } else if (className === "add-document") {
        addDocument(id);
      }
    } else {
      if (className === "add-root-document") {
        addDocument("root");
      } else if (className === "aside-header-title") {
        toRootPage();
      }
    }
  });

  const fetchAllDocuments = async () => {
    try {
      const document = await request("/documents");
      this.setState(...this.state, document);
    } catch (e) {
      alert(e.messagee);
    }
  };

  fetchAllDocuments();
}
