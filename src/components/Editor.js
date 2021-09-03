export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";
  $target.appendChild($editor);

  let isInit = false;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = /* html */ `
        <input type="text" name="title" placeholder="제목을 입력해주세요" value="${this.state.title}" />
        <textarea name="content" placeholder="내용을 입력해주세요">${this.state.content}</textarea>
      `;
      isInit = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { target } = e;
    const targetName = target.getAttribute("name");

    if (this.state[targetName] !== undefined) {
      const nextState = {
        ...this.state,
        [targetName]: target.value,
      };

      this.setState(nextState);
      onEditing(this.state);
    }
  });
}
