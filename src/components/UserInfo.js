export default function UserInfo({ $target, initialState }) {
  const $info = document.createElement('div');
  $info.setAttribute('class', 'userinfo');
  $target.appendChild($info);

  Object.assign($info.style, {
    display: 'flex',
    color: 'black',
    height: '45px',
    'flex-shrink': 0,
    'align-items': 'center',
    'margin-left': '20px',
  });

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $info.innerHTML = `
      <div style="padding-left: 10px">
        ${this.state}의 Notion
      </div>
    `;
  };

  this.render();
}
