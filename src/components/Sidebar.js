import DocsPage from './DocsPage.js';
import AddRootDocButton from './AddRootDocButton.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

export default function Sidebar({ $target }) {
  const $sidebar = document.createElement('aside');
  $target.appendChild($sidebar);

  Object.assign($sidebar.style, {
    width: '300px',
    height: '100%',
    'background-color': '#f7f6f3',
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
