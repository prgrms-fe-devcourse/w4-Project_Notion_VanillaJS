import api from "../../api.js";

export default function DocumentsList({
  $target,
  initialState,
  onGetDocument,
  onCreateDocument,
  onToggleDocument,
}) {
  // DOM Create
  const $documentsList = document.createElement("div");
  $documentsList.className = "list-page__documents-list";

  $target.appendChild($documentsList);

  // State and setState
  // state : {documents:[] , selectedDocument:number, toggledDocuments:Map{}}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // Render
  this.render = () => {
    console.log("render Documents!");
    const { documents } = this.state;
    $documentsList.innerHTML = `
        <div class="documents-list__wrapper">
          <span>Documents</span>
          <button class="create-document-button">📝</button>
        </div>
        `;
    $documentsList.innerHTML += makeDocumentsTree(documents);
  };

  // EventListners
  $documentsList.addEventListener("click", async (e) => {
    const { target } = e;
    const $li = target.closest("li");

    const targetClass = e.target.getAttribute("class");

    if (targetClass) {
      if (targetClass.includes("create-document-button")) {
        $li
          ? (await onCreateDocument($li.dataset.id),
            onToggleDocument(parseInt($li.dataset.id)))
          : await onCreateDocument();
      } else if (targetClass.includes("documents-list__toggle")) {
        const { id } = $li.dataset;
        onToggleDocument(parseInt(id));
      } else if ($li) {
        const { id } = $li.dataset;
        onGetDocument(parseInt(id));
      }
    }
  });

  // Functions
  const makeDocumentsTree = (documents, visible = "") => {
    const {
      selectedDocument: { id: selectedId = null },
      toggledDocuments,
    } = this.state;
    return `
    <ul class="documents-list__ul">
       ${documents
         .map(({ id, title, documents: underDocuments }) => {
           return `
          <li data-id=${id} 
            class="documents-list__li  ${visible}"
          >
            ${
              underDocuments.length > 0
                ? `<button class="documents-list__toggle ${
                    toggledDocuments[id] ? "toggled" : ""
                  }">▼</button>`
                : ""
            }
            <span class="documents-list__title ${
              selectedId === id ? "selected" : ""
            }"
            >
              ${title.length > 0 ? title : "Untitled"}</span>
            <button class="create-document-button">📄</button>
            ${
              toggledDocuments[id] && underDocuments.length > 0
                ? makeDocumentsTree(underDocuments)
                : ""
            }
          </li>
          `;
         })
         .join("")}
    </ul>
    `;
  };
}
