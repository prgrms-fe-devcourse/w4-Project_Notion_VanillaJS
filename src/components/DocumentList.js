export default function DocumentList({
  $target,
  initialState,
  onDocumentClick,
}) {
  const $documentList = document.createElement("aside");
  $documentList.className = "listBar";
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const makeArrow = () => {
    return `<svg viewBox="0 0 100 100"><polygon points="5.9,88.2 50,11.8 94.1,88.2 "></polygon></svg>`;
  };

  const renderSubDocsList = (doc) => {
    if (!doc.documents.length) {
      return ``;
    }

    while (doc.documents.length > 0) {
      return `<ul>${doc.documents
        .map((subdoc) => {
          return `<li data-id="${subdoc.id}">${makeArrow()} ${
            subdoc.title
          }${renderSubDocsList(subdoc)}</li>`;
        })
        .join("")}</ul>`;
    }
  };

  this.render = () => {
    $documentList.innerHTML = /* html */ `
      <ul>
        ${this.state
          .map(
            (doc) => `<li data-id="${doc.id}">${makeArrow()} ${doc.title}
            ${renderSubDocsList(doc)}
          </li>`
          )
          .join("")}
      </ul>
    `;
  };

  this.render();
}
