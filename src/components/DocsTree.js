import DocList from './DocList.js';

import { request } from '../services/api.js';
import { push } from '../services/router.js';

const renderSubDocList = async (parentDoc) => {
  const { id } = parentDoc.dataset;

  const { documents: subdocs } = await request(`/documents/${id}`);

  if (!Array.isArray(subdocs) || subdocs.length === 0) {
    const $noPagesInsideMessage = document.createElement('div');
    $noPagesInsideMessage.setAttribute('class', 'doc-list-container');
    $noPagesInsideMessage.textContent = 'No pages inside';
    parentDoc.appendChild($noPagesInsideMessage);
    return;
  }

  new DocList({
    $target: parentDoc,
    initialState: subdocs,
  });
};

const toggleFoldButton = ($button) => {
  const { className } = $button;

  if (className === 'fold-button--folded') {
    $button.className = 'fold-button--unfolded';
  } else if (className === 'fold-button--unfolded') {
    $button.className = 'fold-button--folded';
  }
};

const unfoldSubDocList = (parentDoc, $button) => {
  renderSubDocList(parentDoc);
  toggleFoldButton($button);
};

const foldSubDocList = (parentDoc, $button) => {
  parentDoc.removeChild(parentDoc.querySelector('.doc-list-container'));
  toggleFoldButton($button);
};

const refreshSubDocList = (parentDoc) => {
  if (parentDoc.querySelector('.doc-list-container')) {
    parentDoc.removeChild(parentDoc.querySelector('.doc-list-container'));
  }

  renderSubDocList(parentDoc);
  if (parentDoc.querySelector('.fold-button--folded')) {
    toggleFoldButton(parentDoc.querySelector('.fold-button--folded'));
  }
};

export default function DocsTree({ $target, initialState }) {
  const $tree = document.createElement('div');
  $tree.setAttribute('class', 'sidebar__docs-tree');

  this.state = initialState;

  const rootDocList = new DocList({
    $target: $tree,
    initialState: this.state,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    rootDocList.setState(this.state);
  };

  $tree.addEventListener('click', async (e) => {
    const targetDoc = e.target.closest('li');

    if (!targetDoc) {
      return;
    }

    const $eventTarget = e.target;

    const { id } = $eventTarget.dataset;

    if ($eventTarget.className === 'doc-list-item__inner') {
      push(`/documents/${id}`);
      return;
    }

    if ($eventTarget.nodeName.toLowerCase() !== 'button') {
      return;
    }

    const { className } = $eventTarget;

    if (className === 'fold-button--folded') {
      unfoldSubDocList(targetDoc, $eventTarget);
    } else if (className === 'fold-button--unfolded') {
      foldSubDocList(targetDoc, $eventTarget);
    } else if (className === 'add-button') {
      const createdDoc = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '문서 제목',
          parent: id,
        }),
      });

      push(`/documents/${createdDoc.id}`);

      refreshSubDocList(targetDoc, $eventTarget);
    }
  });

  $tree.addEventListener('mouseover', (e) => {
    const targetDoc = e.target.closest('li');

    if (!targetDoc) {
      return;
    }

    e.stopPropagation();
    targetDoc.classList.add('current-hover');
  });

  $tree.addEventListener('mouseout', (e) => {
    const targetDoc = e.target.closest('li');

    if (!targetDoc) {
      return;
    }

    targetDoc.classList.remove('current-hover');
  });

  $target.appendChild($tree);
}
