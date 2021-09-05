export default function UserInfo({ $target, initialState }) {
  const $userInfo = document.createElement('div');
  $userInfo.setAttribute('class', 'sidebar__user-info');

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
