const getDocument = (data) => {
  const { id, title, documents } = data;

  return /*html*/ `
    <ul id = 'document-${id}'>
      <div class="document">${title}<button class="add-btn">+</button></div>
      <li>${
        documents.length === 0
          ? ""
          : documents.map((document) => getDocument(document)).join("")
      }</li>
    </ul>`;
};

export default function DocumentList({ $target, initialState, addDocument }) {
  const $documentContainer = document.createElement("div");
  $documentContainer.className = "document-container";
  $target.appendChild($documentContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $documentContainer.innerHTML = `${this.state
      .map((document) => getDocument(document))
      .join("")}`;
  };

  $documentContainer.addEventListener("click", (e) => {
    if (e.target.className === "document-container") return;

    const $document = e.target.closest("ul");
    const addButton = $document.querySelector(".add-btn");

    if (e.target === addButton) {
      const [, id] = $document.id.split("-");
      addDocument(id);
    }
  });

  this.render();
}
