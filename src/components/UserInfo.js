export default function UserInfo({ $target, initialState }) {
  const $info = document.createElement('div');
  $info.setAttribute('class', 'userinfo');
  $target.appendChild($info);

  Object.assign($info.style, {
    display: 'flex',
    'align-items': 'center',
    height: '45px',
    'margin-left': '20px',
    color: 'black',
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $info.innerHTML = `
      <span>
        ${this.state}의 Notion
      </span>
    `;
  };

  this.render();
}
