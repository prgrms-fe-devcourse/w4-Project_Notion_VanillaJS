export default function UserInfo({ $target }) {
  const $userInfo = document.createElement("div");
  $userInfo.className = "userInfo";
  $target.appendChild($userInfo);

  this.render = () => {
    $userInfo.innerHTML = ` <h3><img src="/src/images/notionLogo.png"> 다슬의 Notion</h3>
        `;
  };

  this.render();
}
