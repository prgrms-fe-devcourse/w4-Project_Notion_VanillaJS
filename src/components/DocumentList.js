export default function DocumentList({ $target, initialState }) {
  const $list = document.createElement('div');
  $target.appendChild($list);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state.length === 0) {
      $list.innerHTML = '문서가 없습니다';
      return;
    }

    // TODO: 하위 다큐먼트 렌더링
    $list.innerHTML = `
      <ul>
        ${this.state.map(({ id, title }) => `
          <li data-id="${id}">${title}</li>
        `).join('')}
      </ul>
    `;
  };

  this.render();
}
