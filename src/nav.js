export default function Nav({
  $target,
  initialState,
  onSelecte,
  onCreate,
  onRemove,
}) {
  const toggle = (id) => {
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

  const giveAttribute = (child, ul, addButton, deleteButton) => {
    deleteButton.className = "delete-document";
    deleteButton.textContent = "x";
    addButton.className = "new-child-document";
    addButton.textContent = "+";
    ul.textContent = child.title;
    ul.id = child.id;
    ul.className = window.localStorage.getItem(child.id) || "";
    ul.append(addButton);
    ul.prepend(deleteButton);
  };

  const $nav = document.createElement("nav");
  $target.appendChild($nav);

  this.state = initialState || null;

  this.setState = (nextState) => {
    this.state = nextState || null;
    this.render();
  };
  this.render = () => {
    $nav.innerHTML = "";
    const $documentContainer = document.createElement("ul");
    $documentContainer.className = "document-container";
    $nav.appendChild($documentContainer);

    this.makeChildDocuments = (
      documents = this.state,
      $parent = $documentContainer
    ) => {
      for (const child of documents) {
        const ul = document.createElement("ul");
        const addButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        giveAttribute(child, ul, addButton, deleteButton);
        $parent.appendChild(ul);
        if (child.documents.length > 0)
          this.makeChildDocuments(child.documents, ul);
      }
    };

    const makeNewDocumentButton = () => {
      const addDocument = document.createElement("button");
      addDocument.className = "new-document";
      addDocument.textContent = "새문서 추가하기";
      $documentContainer.appendChild(addDocument);
    };

    makeNewDocumentButton();
    this.makeChildDocuments();
  };

  $nav.addEventListener("click", (e) => {
    if (e.target.tagName === "NAV") return;
    const targetDocumentId = e.target.id;
    const clickedButton = e.target.className;
    const targetList = parseInt(e.target.closest("ul").id);
    switch (clickedButton) {
      case "delete-document":
        onRemove(targetList);
        break;
      case "new-child-document":
        onCreate(targetList);
        initializeToggle(targetList);
        break;
      case "new-document":
        onCreate();
        break;
      default:
        toggle(targetDocumentId);
        onSelecte(targetDocumentId);
    }
  });
}
