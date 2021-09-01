import DocsTree from './DocsTree.js';

import { request } from '../services/api.js';

export default function DocsPage({ $target }) {
  const $page = document.createElement('div');
  $page.setAttribute('class', 'docspage');

  Object.assign($page.style, {
    overflow: 'auto',
    'flex-grow': 1,
  });

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
