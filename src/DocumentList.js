export default function DocumentsList({
  targetElement,
  initialState,
  onSelecte,
  onCreate,
  onRemove,
}) {
  const toggleHideClass = (id) => {
    const targetDocument = document.getElementById(id);
    toggleWrap(targetDocument, id);
    targetDocument.childNodes.forEach((node) => {
      if (node.tagName !== "UL") return;
      node.classList.toggle("hide");
      window.localStorage.setItem(node.id, node.classList);
    });
  };
  const toggleWrap = (targetDocument, id) => {
    targetDocument.classList.toggle("wrap");
    if (targetDocument.lastElementChild.tagName !== "UL") {
      targetDocument.classList.remove("wrap");
    }
    window.localStorage.setItem(id, targetDocument.classList);
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
    addButton.className = "new-child-document";
    addButton.textContent = "+";
    deleteButton.textContent = "🗑";
    ulElement.textContent = child.title;
    ulElement.id = child.id;
    ulElement.className = window.localStorage.getItem(child.id) || "";
    ulElement.appendChild(deleteButton);
    ulElement.appendChild(addButton);
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
      const addButtonContainer = document.createElement("div");
      addButtonContainer.className = "addButton-container";
      const addButton = document.createElement("button");
      const addButtonText = document.createElement("div");
      addButtonText.textContent = "Add a Page";
      addButton.className = "new-document";
      addButton.textContent = "+";
      addButtonContainer.appendChild(addButton);
      addButtonContainer.appendChild(addButtonText);
      documentContainerElement.appendChild(addButtonContainer);
    };
    this.buildTreeViewWithDocuments();
    makeNewDocumentButton();
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
