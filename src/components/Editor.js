export default function Editor({
  $target,
  initialState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  let isInit = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
    <input type="text" name="title" value="${this.state.title}"/>
    <textarea name="content">${this.state.content}</textarea>`;
      isInit = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");
    // this.state에 name에 해당하는 value가 있다면
    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
