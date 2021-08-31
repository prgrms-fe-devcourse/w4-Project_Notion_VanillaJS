import { request } from '../services/api.js';
import { push } from '../services/router.js';
import SubDocList from './SubDocList.js';

export default function DocList({ $target, initialState }) {
  const $list = document.createElement('div');
  $target.appendChild($list);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length === 0) {
      $list.innerHTML = '';
      return;
    }

    $list.innerHTML = `
      <ul>
        ${this.state.map(({ id, title }) => `
          <li data-id="${id}">
            <button data-id="${id}" class="unfold">></button>
            ${title}(${id})
          </li>
        `).join('')}
      </ul>
    `;
  };

  this.render();

  $list.addEventListener('click', async (e) => {
    const $li = e.target.closest('li');

    if (!$li) {
      return;
    }

    const id = Number($li.dataset.id);

    push(`/documents/${id}`);

    const { className } = e.target;

    if (className === 'unfold') {
      // const { documents: subdocs } = this.state.find((rootDoc) => rootDoc.id === id) || {};
      const { documents: subdocs } = await request(`/documents/${id}`);

      if (!subdocs) {
        return;
      }

      new SubDocList({
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
