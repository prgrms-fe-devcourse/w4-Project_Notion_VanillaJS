import DocsPage from './DocsPage.js';
import AddRootDocButton from './AddRootDocButton.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

export default function Sidebar({ $target }) {
  const $sidebarContainer = document.createElement('div');
  $sidebarContainer.setAttribute('class', 'sidebar-container');
  $target.appendChild($sidebarContainer);

  Object.assign($sidebarContainer.style, {
    position: 'relative',
    width: '320px',
    'background-color': 'rgb(247 246 243)',
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

  this.render = async () => {
    await docsPage.render();
    await addRootButton.render();
  };
}
