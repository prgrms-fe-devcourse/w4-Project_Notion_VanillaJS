import {
  DOC_LIST_TREE_TYPE,
  DOC_LIST_TABLE_TYPE,
} from '../constants.js';

export default function DocList({
  $target,
  initialState,
  type = DOC_LIST_TREE_TYPE,
}) {
  const $listContainer = document.createElement('div');
  $listContainer.setAttribute('class', 'doc-list-container');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state || this.state.length === 0) {
      $listContainer.innerHTML = '';
      return;
    }

    if (type === DOC_LIST_TREE_TYPE) {
      $listContainer.innerHTML = `
      <ul class="doc-list">
        ${this.state.map(({ id, title }) => `
          <li class="doc-list-item" data-id="${id}">
            <div class="doc-list-item__inner" data-id="${id}">
              <button class="fold-button--folded" data-id="${id}" name="fold" >▶</button>
              ${title}(${id})
              <button class="add-button" data-id="${id}" name="add">+</button>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
      return;
    }

    if (type === DOC_LIST_TABLE_TYPE) {
      $listContainer.innerHTML = `
      <ul class="doc-table-list">
        ${this.state.map(({ id, title }) => `
          <li class="doc-table-list-item" data-id="${id}">
            <span class="doc-table-list-item__text" data-id="${id}">${title}(${id})</span>
          </li>
        `).join('')}
      </ul>
    `;
    }
  };

  this.render();

  $target.appendChild($listContainer);
}
