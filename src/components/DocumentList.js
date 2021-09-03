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

  const renderSubDocsList = (doc) => {
    if (!doc.documents.length) {
      return ``;
    }

    while (doc.documents.length > 0) {
      return `<ul>${doc.documents
        .map((subdoc) => {
          return `<li data-id="${subdoc.id}">${subdoc.title}${renderSubDocsList(
            subdoc
          )}</li>`;
        })
        .join("")}</ul>`;
    }
  };

  this.render = () => {
    $documentList.innerHTML = /* html */ `
      <ul>
        ${this.state
          .map(
            (doc) => `<li data-id="${doc.id}">${doc.title}
            ${renderSubDocsList(doc)}
          </li>`
          )
          .join("")}
      </ul>
    `;
  };

  this.render();
}
