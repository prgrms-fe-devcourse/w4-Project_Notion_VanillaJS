import { push } from "../router.js";

export default function LinkButton({ $target, initialState, className }) {
  const $linkButton = document.createElement("button");
  $target.appendChild($linkButton);
  $linkButton.className = className;

  this.state = initialState;

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };

  this.render();

  $linkButton.addEventListener("click", (e) => {
    push(this.state.link);
  });
}
