import DocList from './DocList.js';

import { DOC_LIST_TABLE_TYPE } from '../constants.js';
import { push } from '../services/router.js';

export default function SubDocLinks({ $target, initialState }) {
  const $listContainer = document.createElement('div');
  $listContainer.setAttribute('class', 'subdoclinks-container');

  Object.assign($listContainer.style, {
    overflow: 'auto',
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
    this.render();
  };

  this.render = () => {
    $target.appendChild($listContainer);
  };

  this.render();

  $listContainer.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    const { id } = $li.dataset;

    push(`/documents/${id}`);
  });
}
