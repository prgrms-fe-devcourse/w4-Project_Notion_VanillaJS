const renderLists = (documents, display = 'inline') => {
  return `
      ${documents
        .map(
          ({ id, title, isToggled, documents }) => `
          <ul class="sidebar">
            <li data-id="${id}" style="${display}">
              <button class="sidebar__toggle" type="button">▶</button>
              <span class="sidebar__title">${title}</span>
              <button class="sidebar__add" type="button">+</button>
              <button class="sidebar__delete" type="button">-</button>
            </li>
            ${
              documents.length > 0
                ? renderLists(
                    documents,
                    `display: ${isToggled ? 'none' : 'inline'};`
                  )
                : ''
            }
          </ul>
          `
        )
        .join('')}
    `;
};

export default function Sidebar({
  $target,
  intialState,
  createList,
  showDocument,
  toggleList,
  deleteList
}) {
  const $sidebar = document.createElement('aside');
  $target.appendChild($sidebar);

  this.state = intialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = renderLists(this.state);
  };

  this.render();

  $sidebar.addEventListener('click', e => {
    const className = e.target.className;
    const $li = e.target.closest('li');

    if (!$li) {
      return;
    }

    const documentId = parseInt($li.dataset.id);

    switch (className) {
      case 'sidebar__add':
        createList(documentId);
        break;
      case 'sidebar__title':
        showDocument(documentId);
        break;
      case 'sidebar__toggle':
        toggleList({ rootDocuments: this.state, documentId });
        break;
      case 'sidebar__delete':
        deleteList(documentId);
        break;
      default:
        console.log('out of className');
    }
  });
}
