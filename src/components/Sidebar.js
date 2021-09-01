import { request } from '../api.js';

const renderLists = (documents, depth = 0) => {
  depth++;
  return `
    <ul class="sidebar">
      ${documents
        .map(
          ({ id, title, documents }) => `
          <li data-id="${id}" data-depth="${depth}">
            <button class="sidebar__toggle" type="button">▶</button>
            <span class="sidebar__title">${title}</span>
            <button class="sidebar__add" type="button">+</button>
            ${documents.length ? renderLists(documents, depth) : ''}
          </li>
          `
        )
        .join('')}
    </ul>
    `;
};

export default function Sidebar({ $target, addList, showDocument, foldList }) {
  const $sidebar = document.createElement('aside');
  $target.appendChild($sidebar);

  this.render = async () => {
    const documents = await request('/documents/');
    $sidebar.innerHTML = renderLists(documents);
  };

  this.render();

  $sidebar.addEventListener('click', e => {
    const clicked = e.target;
    const className = clicked.className;
    const $li = clicked.closest('li');
    const id = parseInt($li.dataset.id);
    const depth = parseInt($li.dataset.depth);

    if (className === 'sidebar__add') {
      addList(id);
    } else if (className === 'sidebar__title') {
      showDocument(id);
    } else if (className === 'sidebar__toggle') {
      foldList($li, depth);
    }
  });
}