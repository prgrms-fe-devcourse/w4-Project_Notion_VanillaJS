export default function Header({ $target, initialState }) {
  const $header = document.createElement("h3");
  $target.appendChild($header);
  this.state = initialState;

  this.render = () => {
    $header.innerHTML = `${this.state}의 Notion`;
  }

  this.render()
}
