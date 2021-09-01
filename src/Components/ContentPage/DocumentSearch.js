export default function DocumentSearch({
  $target,
  initialState,
  onMakeDocumentLink,
}) {
  // DOM Create
  const $searchForm = document.createElement("form");
  $searchForm.className = "document-search__form";

  // state, setState
  // state : flattedDocuments {}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // Render

  this.render = () => {
    $target.appendChild($searchForm);
    const { selectedDocument, flattedDocuments } = this.state;
    let flattedDocumentsEntries = Object.entries(flattedDocuments);
    const { id: selectedId } = selectedDocument;
    console.log(selectedId);
    $searchForm.innerHTML = `
        <input list="documents-list" class="document-search__input" placeholder="Link Document" />
        <datalist id="documents-list">
            ${flattedDocumentsEntries
              .map(([id, title]) =>
                selectedId !== parseInt(id)
                  ? `<option data-id=${id} value="${title}"/>`
                  : ""
              )
              .join("")}
        </datalist>
        
        `;
    const $input = $searchForm.querySelector(".document-search__input");
    $input.focus();
  };
  this.render();

  // Event Listener
  $searchForm.addEventListener("submit", (e) => {
    try {
      e.preventDefault();
      const { target } = e;
      const searchTitle = e.target.querySelector("input").value;
      const $option = target.querySelector(`[value="${searchTitle}"]`);
      const { id } = $option.dataset;
      onMakeDocumentLink(id, searchTitle);
    } catch (e) {
      console.error(e);
    }
  });

  $searchForm.addEventListener("keyup", (e) => {
    e.stopPropagation();
  });
  $searchForm.addEventListener("focusout", (e) => {
    setTimeout(() => {
      try {
        $target.removeChild($searchForm);
      } catch (e) {}
    }, 0);
  });
}
