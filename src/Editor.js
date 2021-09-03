export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;

    this.render();
  };

  let isInitialize = false;

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" placeholder="제목 없음" value="${this.state.title}" style="display: block;">
        <textarea name="content" placeholder='명령어 사용 시 "/"를 입력하세요'>${this.state.content}</textarea>
      `;
      isInitialize = true;
    }
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const { name } = e.target;
    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: e.target.value,
      };

      this.setState(nextState);
      onEditing(nextState);
    }
  });
}
