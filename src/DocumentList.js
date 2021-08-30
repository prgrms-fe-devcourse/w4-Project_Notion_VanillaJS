export default function DocumentList({ $target, inititalState, onClick }) {
  this.state = inititalState;

  const $document = document.createElement('div');

  $target.appendChild($document);

  this.render = () => {
    const documentsIndex = this.state.map(document => this.orderDocuments(document, 10));

    $document.innerHTML = `
        <ul>
        ${documentsIndex.map(document => document.join('')).join('')}
        </ul>
      `;

    $document.addEventListener('click', onClick);
  };

  this.orderDocuments = document => {
    const documentsIndex = [];

    const dfs = (node, level) => {
      documentsIndex.push(
        `<li data-id="${node.id}"style="padding-left:${10 * level}px;">
        <span>${node.title}</span>
        <button>+</button>
        </li>`
      );

      if (node.documents.length > 0) {
        node.documents.forEach(documents => {
          dfs(documents, level + 1);
        });
      }
    };

    dfs(document, 0);

    return documentsIndex;
  };

  this.render();
}
