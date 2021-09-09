import UserInfo from './UserInfo.js';
import DocsPage from './DocsPage.js';
import AddRootDocButton from './AddRootDocButton.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

import { createElement } from '../utils/dom.js';

export default function Sidebar({ $target, initialState }) {
  const $sidebarContainer = createElement('div', {
    class: 'sidebar-container',
  });

  const $sidebar = createElement('aside', {
    class: 'sidebar',
  });

  this.state = initialState;

  new UserInfo({
    $target: $sidebar,
    initialState: this.state.username,
  });

  const docsPage = new DocsPage({
    $target: $sidebar,
  });

  const addRootButton = new AddRootDocButton({
    $target: $sidebar,
    onClickAddButton: async () => {
      const createdDoc = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '새 루트 문서',
          parent: null,
        }),
      });

      push(`/documents/${createdDoc.id}`);

      this.render();
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = async () => {
    await docsPage.render();
    await addRootButton.render();
  };

  $sidebarContainer.appendChild($sidebar);
  $target.appendChild($sidebarContainer);
}
