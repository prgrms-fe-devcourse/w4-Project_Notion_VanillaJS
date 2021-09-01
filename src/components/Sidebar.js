import UserInfo from './UserInfo.js';
import DocsPage from './DocsPage.js';
import AddRootDocButton from './AddRootDocButton.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

export default function Sidebar({ $target, initialState }) {
  const $sidebarContainer = document.createElement('div');
  $sidebarContainer.setAttribute('class', 'sidebar-container');
  $target.appendChild($sidebarContainer);

  Object.assign($sidebarContainer.style, {
    position: 'relative',
    width: '320px',
    'background-color': 'rgb(247 246 243)',
    color: 'rgb(55 53 47)',
  });

  const $sidebar = document.createElement('aside');
  $sidebar.setAttribute('class', 'sidebar');
  $sidebarContainer.appendChild($sidebar);

  Object.assign($sidebar.style, {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    position: 'absolute',
    height: '100%',
    width: '100%',
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
}
