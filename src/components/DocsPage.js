import DocList from './DocList.js';

import { request } from '../services/api.js';

export default function DocsPage({ $target, onClickDoc }) {
  const $page = document.createElement('div');

  const documentList = new DocList({
    $target: $page,
    initialState: [],
    onClickDoc,
  });

  this.render = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);

    $target.appendChild($page);
  };
}
