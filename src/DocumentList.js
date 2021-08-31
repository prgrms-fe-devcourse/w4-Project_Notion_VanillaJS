export default function DocumentsList({
  targetElement,
  initialState,
  onSelecte,
  onCreate,
  onRemove,
}) {
  const toggleHideClass = (id) => {
    const documents = document.getElementById(id);
    documents.childNodes.forEach((node) => {
      if (node.tagName !== "UL") return;
      node.classList.toggle("hide");
      window.localStorage.setItem(node.id, node.className);
    });
  };

  const initializeToggle = (id) => {
    const documents = document.getElementById(id);
    documents.childNodes.forEach((node) => {
      if (node.tagName !== "UL") return;
      node.classList.remove("hide");
      window.localStorage.removeItem(node.id, node.className);
    });
  };

  const giveAttribute = (child, ulElement, addButton, deleteButton) => {
    deleteButton.className = "delete-document";
    deleteButton.textContent = "x";
    addButton.className = "new-child-document";
    addButton.textContent = "+";
    ulElement.textContent = child.title;
    ulElement.id = child.id;
    ulElement.className = window.localStorage.getItem(child.id) || "";
    ulElement.append(addButton);
    ulElement.prepend(deleteButton);
  };

  const navElement = document.createElement("nav");
  targetElement.appendChild(navElement);

  this.state = initialState || null;

  this.setState = (nextState) => {
    if (!nextState) return;
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    navElement.innerHTML = "";
    const documentContainerElement = document.createElement("ul");
    documentContainerElement.className = "document-container";
    navElement.appendChild(documentContainerElement);

    this.buildTreeViewWithDocuments = (
      documents = this.state,
      parentElement = documentContainerElement
    ) => {
      for (const childDocument of documents) {
        const ulElement = document.createElement("ul");
        const addButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        giveAttribute(childDocument, ulElement, addButton, deleteButton);
        parentElement.appendChild(ulElement);
        if (childDocument.documents.length > 0)
          this.buildTreeViewWithDocuments(childDocument.documents, ulElement);
      }
    };

    const makeNewDocumentButton = () => {
      const addButton = document.createElement("button");
      addButton.className = "new-document";
      addButton.textContent = "새문서 추가하기";
      documentContainerElement.appendChild(addButton);
    };
    makeNewDocumentButton();
    this.buildTreeViewWithDocuments();
  };
  navElement.addEventListener("click", (e) => {
    if (e.target.tagName === "NAV") return;
    clickEventHandler(e);
  });
  const clickEventHandler = (e) => {
    const targetDocumentId = e.target.id;
    const clickedButtonClass = e.target.className;
    const targetListId = parseInt(e.target.closest("ul").id);
    switch (clickedButtonClass) {
      case "delete-document":
        onRemove(targetListId);
        break;
      case "new-child-document":
        onCreate(targetListId);
        initializeToggle(targetListId);
        break;
      case "new-document":
        onCreate();
        break;
      default:
        toggleHideClass(targetDocumentId);
        onSelecte(targetDocumentId);
    }
  };
}
