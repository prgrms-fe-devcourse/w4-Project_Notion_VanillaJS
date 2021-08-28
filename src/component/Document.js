function createElement(tag, name) {
  const $element = document.createElement(`${tag}`);
  $element.className = `${name}`;

  return $element;
}

export default function Document({ $target, initialState }) {
  if (!new.target) {
    throw new Error("Document new 연산자 Error");
  }

  const $documentContainer = createElement("li", "document");
  const $titleWrapper = createElement("div", "title-wrapper");
  const $documentsWrapper = createElement("ul", "documents-wrapper");
  const $listButton = createElement("button", "list-btn");
  const $text = createElement("div", "title");
  const $addButton = createElement("button", "add-btn");

  $target.appendChild($documentContainer);
  $documentContainer.appendChild($titleWrapper);
  $documentContainer.appendChild($documentsWrapper);
  $titleWrapper.appendChild($listButton);
  $titleWrapper.appendChild($text);
  $titleWrapper.appendChild($addButton);

  $documentsWrapper.style.display = "none";
  $listButton.textContent = "▶";
  $addButton.textContent = "추가";

  this.state = initialState;

  this.render = () => {
    $text.textContent = `${this.state.title}`;

    $listButton.addEventListener("click", (e) => {
      const nowButton = e.target;
      const nowDocument = nowButton.parentNode.parentNode.lastChild;

      nowButton.textContent = nowButton.textContent === "▶" ? "▼" : "▶";
      nowDocument.style.display =
        nowDocument.style.display === "none" ? "" : "none";
    });

    this.state.documents.forEach((element) => {
      new Document({
        $target: $documentsWrapper,
        initialState: element,
      });
    });

    if (this.state.documents.length === 0) {
      $documentsWrapper.innerHTML = `No pages inside`;
    }
  };

  this.render();
}
