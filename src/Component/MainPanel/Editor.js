export default function Editor({ $target, init, onEdit }) {
  const $editor = document.createElement("div");
  $editor.className = "main-page-container__editor";
  this.state = init;
  let isInit = false;
  $target.appendChild($editor);
  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <input type='text' name='title' value="${this.state.title}"></input>
        <textarea name="content">${this.state.title}</textarea>
      `;
      isInit = true;
    }
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };
      this.setState(nextState);
      onEdit(this.state);
    }
  });
}
