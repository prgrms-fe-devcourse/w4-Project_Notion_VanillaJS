export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  let isInitialized = false;
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInitialized) {
      $editor.innerHTML = `
        <input type="text" name ="title" value="${this.state.title}" style="width:600px;"/>
        <textarea name="content" style="width : 600px; height: 600px;">${this.state.content}</textarea>
      `;

      isInitialized = true;
    }
  };

  this.render();

  // 이벤트 버블
  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const name = target.getAttribute("name");

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
