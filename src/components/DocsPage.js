import DocsTree from './DocsTree.js';

import { request } from '../services/api.js';

export default function DocsPage({ $target }) {
  const $page = document.createElement('div');

  const docsTree = new DocsTree({
    $target: $page,
    initialState: [],
  });

  this.render = async () => {
    const documents = await request('/documents');
    docsTree.setState(documents);

    $target.appendChild($page);
  };
}
