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

  $tree.addEventListener('click', async (e) => {
    const $li = e.target.closest('li');

    if (!$li) {
      return;
    }

    const id = Number($li.dataset.id);

    push(`/documents/${id}`);

    const { className } = e.target;

    if (className === 'unfold') {
      const { documents: subdocs } = await request(`/documents/${id}`);

      if (!subdocs) {
        return;
      }

      new DocList({
        $target: $li,
        initialState: subdocs,
      });

      e.target.textContent = '_';
      e.target.className = 'fold';
    } else if (className === 'fold') {
      $li.removeChild($li.querySelector('div'));

      e.target.textContent = '>';
      e.target.className = 'unfold';
    }
  });
}
