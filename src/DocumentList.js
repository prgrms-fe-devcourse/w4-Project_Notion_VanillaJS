import { request } from './api.js';

export default function DocumentList({ $target, inititalState, onClick }) {
  this.state = inititalState;

  const $document = document.createElement('div');

  $target.appendChild($document);

  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const documentsIndex = this.state.map(document => orderDocuments(document, 10));

    $document.innerHTML = `
        <ul>
        ${documentsIndex.map(document => document.join('')).join('')}
        </ul>
      `;
  };

  const orderDocuments = document => {
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

  $document.addEventListener('click', onClick);

  const fetchDocument = async () => {
    const documents = await request();

    this.setState(documents);
  };

  fetchDocument();
}
