import { push } from "./router.js";

export default function LinkButton({ $target, initialState }) {
  const $linkButton = document.createElement("button");

  $target.appendChild($linkButton);

  this.state = initialState;

  $linkButton.setAttribute("class", `${this.state.btnType}Button`);

  this.render = () => {
    $linkButton.textContent = this.state.text;
  };

  this.render();

  $linkButton.addEventListener("click", () => {
    push(
      this.state.link,
      this.state.btnType,
      this.state.id,
      this.state.parentId
    );
  });
}
