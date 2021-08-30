export default function ContentNav({ $target, initialState, onGetDocument }) {
  // DOM Create
  const $nav = document.createElement("nav");
  $nav.className = "content-nav";
  $target.appendChild($nav);

  // State, setState
  //    State : selectedDocument {id:Number, title:String, content:String ,  documents:Array}
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  // Render
  this.render = () => {
    const { id, title, documents } = this.state;
    $nav.innerHTML = `
    <ul>
        <li class="content-nav__document link" data-id="${id}"><span>${title}</span> ${
      documents.length > 0 ? renderUnderDocumentsTitle(documents) : ""
    }</li>
    </ul>
    `;
  };
  // EventHandler
  $nav.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");
    if ($li) {
      const { id } = $li.dataset;
      onGetDocument(id);
    }
  });

  // Functions
  function renderUnderDocumentsTitle(documents) {
    return `
    <ul>
        ${documents
          .map(
            (document) =>
              `<li class="content-nav__document link" data-id="${
                document.id
              }"><span>${document.title}</span> ${
                document.documents.length > 0
                  ? renderUnderDocumentsTitle(document.documents)
                  : ""
              }</li>`
          )
          .join("")}
    </ul>`;
  }
}
