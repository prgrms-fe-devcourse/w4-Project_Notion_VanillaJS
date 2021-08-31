export default function Editor({ $target, initialState, onEditing }) {
  console.log(initialState);
  const $editor = document.createElement("div");
  let isinitialize = false;

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isinitialize) {
      $editor.innerHTML = `
        <textarea name="content" style="width:600px; height:400px;">${this.state.content}
        </textarea>
      `;
      isinitialize = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.value };
      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
