export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $header.className = "header";
  $target.appendChild($header);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $header.innerHTML = `<span class="username">${this.state.name}</span>${this.state.name}의 <span class="notion">Notion</span>`;
  };

  this.render();
}
