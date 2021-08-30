export default function SubDocList({ $target, initialState }) {
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
}
