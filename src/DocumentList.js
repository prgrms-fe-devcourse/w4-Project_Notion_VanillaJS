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

  this.addDocument = async documentId => {
    const res = await request('', {
      method: 'POST',
      body: JSON.stringify({
        title: '문서 제목을 입력해주세요.',
        parent: documentId
      })
    });

    const newDocument = { id: res.id, title: res.title, documents: [] };
    const nextState = addChildDocument(newDocument, documentId);

    this.setState(nextState);
  };

  const addChildDocument = (newDocument, documentId) => {
    const nextState = this.state;

    const dfs = node => {
      if (node.id === documentId) {
        node.documents.push(newDocument);
        return;
      }

      if (node.documents.length > 0) {
        node.documents.forEach(documents => {
          dfs(documents);
        });
      }
    };

    nextState.map(document => dfs(document));
    return nextState;
  };

  fetchDocument();
}
