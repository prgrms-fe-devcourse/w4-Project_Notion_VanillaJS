import { pushRoute } from "./router.js";

export default function DocumentList({
  $target,
  initialState,
  onToggle,
  onSelect,
  onCreateChild,
}) {
  const $documentList = document.createElement("div");
  $documentList.className = "documentList";

  $target.appendChild($documentList);

  this.state = initialState;
  this.toggledState = [];
  this.selectedState = [];

  this.setState = (nextState, nextToggledState, nextSelectedState) => {
    this.state = nextState;
    this.toggledState = nextToggledState;

    this.selectedState = nextSelectedState;
    this.render();
  };

  function checkSelected(id, selectedDocument) {
    if (selectedDocument[0]) {
      if (id === selectedDocument[0]) {
        return "isSelectedText";
      }
      return "";
    }
  }

  function createListTree(documents, toggledDocuments, selectedDocument) {
    return documents
      .map(
        (document) => `
    <ul>
      ${
        toggledDocuments.includes(document.id)
          ? `
          <li id=${document.id}>
            <button id='toggledImage' class='toggleDocument'></button>
            <span id='${checkSelected(
              document.id,
              selectedDocument
            )}' class='selectDocument'> ${
              document.title.length ? document.title : "제목 없음"
            } </span>
            <button class='createChildDocument'>➕</button>
          </li>
            ${
              document.documents.length
                ? createListTree(
                    document.documents,
                    toggledDocuments,
                    selectedDocument
                  )
                : '<ul><li class="noChildDocument">하위 Document가 없습니다.</li></ul>'
            }
        `
          : `
          <li id=${document.id}>
            <button id='toggleImage' class='toggleDocument'></button>
            <span id='${checkSelected(
              document.id,
              selectedDocument
            )}' class='selectDocument'> ${
              document.title.length ? document.title : "제목 없음"
            } </span>
            <button class='createChildDocument'>➕</button>
          </li>
        `
      }
    </ul>  `
      )
      .join("");
  }

  this.render = () => {
    $documentList.innerHTML = `
      ${createListTree(this.state, this.toggledState, this.selectedState)}
      <button class='createDocument'>새로운 Document 추가하기</button>
    `;

    const $selectedLi = document.getElementById(`${this.selectedState[0]}`);
    if ($selectedLi) {
      $selectedLi.classList.add("isSelected");
    }
  };

  $documentList.addEventListener("click", async (e) => {
    const { className } = e.target;
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li;
      switch (className) {
        case "toggleDocument":
          onToggle(id);
          break;
        case "selectDocument":
          onSelect(id);
          break;
        case "createChildDocument":
          onCreateChild(id);
          break;
        default:
          return;
      }
    } else if (className === "createDocument") {
      pushRoute("/documents/new");
    }
  });
}
