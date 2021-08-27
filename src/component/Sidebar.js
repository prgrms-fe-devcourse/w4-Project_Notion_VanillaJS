export default function Sidebar({ $target }) {
  const $sidebar = document.createElement("div");
  $sidebar.className = "notion-sidebar";
  $target.appendChild($sidebar);

  this.render = () => {
    $sidebar.textContent = "사이드바입니다.";
  };

  this.render();
}
