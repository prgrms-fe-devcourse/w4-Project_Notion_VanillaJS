export default function Header({ $target }) {
  if (!new.target) {
    throw new Error("Header new 연산자 누락!");
  }
  const $header = document.createElement("h1");
  $header.className = "sidebar-header";

  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = "Notion Clone";
  };

  this.render();
}
