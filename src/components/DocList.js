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
            <button data-id="${id}" name="fold" class="folded">></button>
            ${title}(${id})
            <button data-id="${id}" class="add">+</button>
          </li>
        `).join('')}
      </ul>
    `;
  };

  this.render();
}
