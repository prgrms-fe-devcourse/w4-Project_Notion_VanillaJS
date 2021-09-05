import DocList from './DocList.js';

import { DOC_LIST_TABLE_TYPE } from '../constants.js';
import { push } from '../services/router.js';

export default function SubDocLinks({ $target, initialState }) {
  const $listContainer = document.createElement('div');
  $listContainer.setAttribute('class', 'subdoclinks-container');

  Object.assign($listContainer.style, {
    overflow: 'auto',
    'margin-bottom': '20px',
  });

  this.state = initialState;

  const subDocList = new DocList({
    $target: $listContainer,
    initialState: this.state,
    type: DOC_LIST_TABLE_TYPE,
  });

  this.setState = (nextState) => {
    this.state = nextState;

    subDocList.setState(this.state);
  };

  $listContainer.addEventListener('click', (e) => {
    const $eventTarget = e.target;

    const $targetDoc = $eventTarget.className === 'doc-table-list-item__text' ? $eventTarget : null;

    if (!$targetDoc) {
      return;
    }

    const { id } = $targetDoc.dataset;

    push(`/documents/${id}`);
  });

  $target.appendChild($listContainer);
}
