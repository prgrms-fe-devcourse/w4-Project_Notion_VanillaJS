export default function UserInfo({ $target, initialState }) {
  const $userInfo = document.createElement('div');
  $userInfo.setAttribute('class', 'userinfo');

  Object.assign($userInfo.style, {
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
    $userInfo.innerHTML = `
      <div style="padding-left: 10px">
        ${this.state}의 Notion
      </div>
    `;
  };

  this.render();

  $target.appendChild($userInfo);
}
