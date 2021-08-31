import DocList from './DocList.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

export default function DocsTree({ $target, initialState }) {
  const $tree = document.createElement('div');
  $target.appendChild($tree);

  this.state = initialState;

  const rootDocList = new DocList({
    $target: $tree,
    initialState: this.state,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    rootDocList.setState(this.state);
  };

  const renderSubDocList = async (parentDoc) => {
    const { id } = parentDoc.dataset;

    const { documents: subdocs } = await request(`/documents/${id}`);

    if (!subdocs) {
      return;
    }

    new DocList({
      $target: parentDoc,
      initialState: subdocs,
    });
  };

  const toggleFoldButton = ($button) => {
    const { className } = $button;

    if (className === 'unfold') {
      $button.textContent = '_';
      $button.className = 'fold';
    } else if (className === 'fold') {
      $button.textContent = '>';
      $button.className = 'unfold';
    }
  };

  const unfoldSubDocList = (parentDoc, $button) => {
    renderSubDocList(parentDoc);
    toggleFoldButton($button);
  };

  const foldSubDocList = (parentDoc, $button) => {
    parentDoc.removeChild(parentDoc.querySelector('div'));
    toggleFoldButton($button);
  };

  const refreshSubDocList = (parentDoc) => {
    if (parentDoc.querySelector('div')) {
      parentDoc.removeChild(parentDoc.querySelector('div'));
    }

    renderSubDocList(parentDoc);
  };

  $tree.addEventListener('click', async (e) => {
    const targetDoc = e.target.closest('li');

    if (!targetDoc) {
      return;
    }

    const $eventTarget = e.target;

    const { id } = $eventTarget.dataset;

    if ($eventTarget.nodeName.toLowerCase() === 'li') {
      push(`/documents/${id}`);
      return;
    }

    if ($eventTarget.nodeName.toLowerCase() !== 'button') {
      return;
    }

    const { className } = $eventTarget;

    if (className === 'unfold') {
      unfoldSubDocList(targetDoc, $eventTarget);
    } else if (className === 'fold') {
      foldSubDocList(targetDoc, $eventTarget);
    } else if (className === 'add') {
      const createdDoc = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '문서 제목',
          parent: id,
        }),
      });

      push(`/documents/${createdDoc.id}`);

      refreshSubDocList(targetDoc);
    }
  });
}
