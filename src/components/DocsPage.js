import DocsTree from './DocsTree.js';

import { request } from '../services/api.js';
import { createElement } from '../utils/dom.js';

export default function DocsPage({ $target }) {
  const $page = createElement('div', {
    class: 'sidebar__docs-page',
  });

  const docsTree = new DocsTree({
    $target: $page,
    initialState: [],
  });

  this.render = async () => {
    const documents = await request('/documents');
    docsTree.setState(documents);
  };

  $target.appendChild($page);
}
