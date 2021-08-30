import DocumentList from './DocumentList.js';

import { request } from '../services/api.js';

export default function DocumentsPage({ $target }) {
  const $page = document.createElement('div');

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
  });

  this.render = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);

    $target.appendChild($page);
  };
}
