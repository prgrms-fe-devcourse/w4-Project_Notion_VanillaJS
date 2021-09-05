import {
  DOC_LIST_TREE_TYPE,
  DOC_LIST_TABLE_TYPE,
} from '../constants.js';

export default function DocList({
  $target,
  initialState,
  type = DOC_LIST_TREE_TYPE,
}) {
  const $list = document.createElement('div');
  $list.setAttribute('class', 'doc-list');

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (!this.state || this.state.length === 0) {
      $list.innerHTML = '';
      return;
    }

    if (type === DOC_LIST_TREE_TYPE) {
      $list.innerHTML = `
      <ul class="tree-ul">
        ${this.state.map(({ id, title }) => `
          <li class="tree-li" data-id="${id}">
            <div class="li-inner-container" data-id="${id}">
              <button class="folded" data-id="${id}" name="fold" >▶</button>
              ${title}(${id})
              <button class="add" data-id="${id}" name="add">+</button>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
      return;
    }

    if (type === DOC_LIST_TABLE_TYPE) {
      $list.innerHTML = `
      <ul class="table-ul">
        ${this.state.map(({ id, title }) => `
          <li class="table-li" data-id="${id}">
            <span class="table-span" data-id="${id}">${title}(${id})</span>
          </li>
        `).join('')}
      </ul>
    `;
    }
  };

  this.render();

  $target.appendChild($list);
}
