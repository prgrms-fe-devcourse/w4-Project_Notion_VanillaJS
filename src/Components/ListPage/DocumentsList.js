import api from "../../api.js";

export default function DocumentsList({
  $target,
  initialState,
  onGetDocument,
  onCreateDocument,
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
  };

  // Render
  this.render = async () => {
    await getRootDocuments();
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
        await createDocument(target);
      } else if (targetClass.includes("documents-list__toggle")) {
        toggleDocument(target);
      } else if ($li) {
        getDocument($li);
      }
    }
  });

  // Functions
  const getRootDocuments = async () => {
    try {
      const documents = await api.getRootDocuments();
      if (Array.isArray(documents)) {
        this.setState({ ...this.state, documents });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const makeDocumentsTree = (documents, visible = "") => {
    const { selectedDocument, toggledDocuments } = this.state;
    return `
    <ul class="documents-list__ul">
       ${documents
         .map(({ id, title, documents: underDocuments }) => {
           return `
          <li data-id=${id} 
            class="documents-list__li ${
              selectedDocument == id ? "selected" : ""
            } ${visible}"
          >
            ${
              underDocuments.length > 0
                ? `<button class="documents-list__toggle ${
                    toggledDocuments.has(String(id)) ? "toggled" : ""
                  }">▼</button>`
                : ""
            }
            <span class="documents-list__title">${
              title.length > 0 ? title : "Untitled"
            }</span>
            <button class="create-document-button">📄</button>
            ${
              toggledDocuments.has(String(id)) && underDocuments.length > 0
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

  const getDocument = (target) => {
    const { id } = target.dataset;
    this.setState({ ...this.state, selectedDocument: id });
    onGetDocument(id);
    this.render();
  };
  const createDocument = async (target) => {
    const $li = target.closest("li");
    const $newDocument = $li
      ? await onCreateDocument($li.dataset.id)
      : await onCreateDocument();
    const { id } = $newDocument;
    this.setState({ ...this.state, selectedDocument: id });
    onGetDocument(id);
    this.render();
  };
  const toggleDocument = (target) => {
    const $parentLi = target.closest("li");
    const { id } = $parentLi.dataset;
    const { toggledDocuments } = this.state;
    toggledDocuments.has(id)
      ? toggledDocuments.delete(id)
      : toggledDocuments.set(id, true);
    this.setState({ ...this.state, toggledDocuments });
    this.render();
  };
}
